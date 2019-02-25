using System.Net;
using Cwx.Winepad.Infrastructure.Validation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Cwx.Winepad.WebApi.Code.Filters
{
    public class ValidationExceptionFilter : ExceptionFilterAttribute
    {
        public override void OnException(ExceptionContext context)
        {
            var fluentValidationException = context.Exception as FluentValidationException;
            var isFluentValidationException = fluentValidationException != null;
            if (isFluentValidationException)
            {
                HandleFluentValidationException(fluentValidationException, context);
            }

            var domainValidationException = context.Exception as DomainValidationException;
            var isDomainValidationException = domainValidationException != null;
            if (isDomainValidationException)
            {
                HandleDomainValidationException(domainValidationException, context);
            }
        }

        private static void HandleFluentValidationException(FluentValidationException e, ExceptionContext ctx)
        {
            ctx.Result = new JsonResult(new { isFluentValidationError = true, e.ValidationResult })
            {
                StatusCode = (int)HttpStatusCode.BadRequest
            };
        }

        private static void HandleDomainValidationException(DomainValidationException e, ExceptionContext ctx)
        {
            ctx.Result = new JsonResult(new { isFluentValidationError = false, e.Errors })
            {
                StatusCode = (int)HttpStatusCode.BadRequest
            };
        }
    }
}