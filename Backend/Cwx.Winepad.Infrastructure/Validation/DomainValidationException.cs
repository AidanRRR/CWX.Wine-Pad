using System;

namespace Cwx.Winepad.Infrastructure.Validation
{
    public class DomainValidationException : Exception
    {
        public DomainValidationException(params string[] errors)
            : base(string.Join(", ", errors))
        {
            Errors = errors;
        }

        public string[] Errors { get; }
    }
}