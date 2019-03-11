using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Cwx.Winepad.Domain.Interfaces;
using FluentValidation;
using MediatR;

namespace Cwx.Winepad.Domain.Country.Features
{
    public class AddCountries
    {
        public class Request : IRequest
        {
            public List<CountryDto> Countries { get; set; }

            public class CountryDto
            {
                public string Name { get; set; }
                public string Code { get; set; }
            }
        }

        public class Validator : AbstractValidator<Request> { }

        public class Handler : IRequestHandler<Request>
        {
            private readonly IRepository _repository;

            public Handler(IRepository repository)
            {
                _repository = repository;
            }

            public async Task<Unit> Handle(Request request, CancellationToken cancellationToken)
            {
                foreach (var countryDto in request.Countries)
                {
                    var country = new Models.Country
                    {
                        Name = countryDto.Name,
                        Code = countryDto.Code
                    };

                    await _repository.InsertAsync(country, cancellationToken);
                }

                return Unit.Value;
            }
        }
    }
}