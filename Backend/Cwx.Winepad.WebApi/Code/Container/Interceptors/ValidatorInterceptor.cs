using System.Threading.Tasks;
using Castle.DynamicProxy;
using Castle.Windsor;
using Cwx.Winepad.Infrastructure.Validation;
using FluentValidation;
using Nito.AsyncEx;

namespace Cwx.Winepad.WebApi.Code.Container.Interceptors
{
    public class ValidatorInterceptor : IInterceptor
    {
        private readonly IWindsorContainer _container;

        public ValidatorInterceptor(IWindsorContainer container)
        {
            _container = container;
        }

        public void Intercept(IInvocation invocation)
            => AsyncContext.Run(() => InterceptAsync(invocation));

        public async Task InterceptAsync(IInvocation invocation)
        {
            var request = invocation.Arguments[0];
            var validator = GetValidatorFor(request);

            if (validator != null)
            {
                try
                {
                    var result = await validator.ValidateAsync(request);
                    if (!result.IsValid)
                    {
                        throw new FluentValidationException(result);
                    }
                }
                finally
                {
                    DisposeValidator(validator);
                }
            }

            invocation.Proceed();

            if (invocation.ReturnValue is Task invocationTask)
            {
                await invocationTask;
            }
        }

        private IValidator GetValidatorFor(object request)
        {
            var validatorType = typeof(IValidator<>).MakeGenericType(request.GetType());
            var validatorExists = _container.Kernel.HasComponent(validatorType);

            return validatorExists ? (IValidator)_container.Resolve(validatorType) : null;
        }

        private void DisposeValidator(IValidator validator)
        {
            _container.Release(validator);
        }
    }
}