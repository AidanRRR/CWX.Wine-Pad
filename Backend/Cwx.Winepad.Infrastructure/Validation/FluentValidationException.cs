using System;
using System.ComponentModel.DataAnnotations;

namespace Cwx.Winepad.Infrastructure.Validation
{
    public class FluentValidationException : Exception
    {
        public FluentValidationException(ValidationResult validationResult)
        {
            ValidationResult = validationResult;
        }

        public ValidationResult ValidationResult { get; }
    }
}