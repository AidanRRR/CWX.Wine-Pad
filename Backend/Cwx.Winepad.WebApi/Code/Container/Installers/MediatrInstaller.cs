using System.Collections.Generic;
using System.Linq;
using Castle.MicroKernel.Registration;
using Castle.MicroKernel.SubSystems.Configuration;
using Castle.Windsor;
using Cwx.Winepad.Domain.Interfaces;
using Cwx.Winepad.WebApi.Code.Container.Interceptors;
using MediatR;
using MediatR.Pipeline;

namespace Cwx.Winepad.WebApi.Code.Container.Installers
{
    public class MediatrInstaller : IWindsorInstaller
    {
        public void Install(IWindsorContainer container, IConfigurationStore store)
        {
            container.Register(Component
                .For<IMediator>()
                .ImplementedBy<Mediator>()
                .LifestyleTransient());

            container.Register(Component
                .For<ServiceFactory>()
                .UsingFactoryMethod<ServiceFactory>(k => (type =>
                {
                    // See: https://github.com/jbogard/MediatR/blob/master/samples/MediatR.Examples.Windsor/Program.cs
                    var enumerableType = type
                        .GetInterfaces()
                        .Concat(new[] { type })
                        .FirstOrDefault(t => t.IsGenericType && t.GetGenericTypeDefinition() == typeof(IEnumerable<>));

                    return enumerableType != null ? k.ResolveAll(enumerableType.GetGenericArguments()[0]) : k.Resolve(type);
                })));

            container.Register(Classes
                .FromAssemblyContaining<IRepository>()
                .BasedOn(
                    typeof(IRequestHandler<>),
                    typeof(IRequestHandler<,>))
                .WithServiceAllInterfaces()
                .Configure(component => component
                    .Interceptors(
                        typeof(ValidatorInterceptor)))
                .LifestyleTransient());

            container.Register(Component
                .For(typeof(IPipelineBehavior<,>))
                .ImplementedBy(typeof(RequestPreProcessorBehavior<,>))
                .LifestyleTransient());

            container.Register(Component
                .For(typeof(IPipelineBehavior<,>))
                .ImplementedBy(typeof(RequestPostProcessorBehavior<,>))
                .LifestyleTransient());
        }
    }
}