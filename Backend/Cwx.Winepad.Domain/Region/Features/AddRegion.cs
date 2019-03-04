using System.Threading;
using System.Threading.Tasks;
using Cwx.Winepad.Domain.Interfaces;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Cwx.Winepad.Domain.Region.Features
{
    public class AddRegion
    {
        public class Request : IRequest
        {
            public string Name { get; set; }
            public int CountryId { get; set; }
            public int AdminId { get; set; }
        }

        public class Validator : AbstractValidator<Request>
        {
            public Validator()
            {
                RuleFor(r => r.Name).NotEmpty();
                RuleFor(r => r.CountryId).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Request>
        {
            private readonly IRepository _repository;

            public Handler(IRepository repository)
            {
                _repository = repository;
            }
            public async Task<Unit> Handle(Request request, CancellationToken cancellationToken)
            {
                var country = await _repository
                    .Query<Models.Country>()
                    .FirstOrDefaultAsync(r => r.Id == request.CountryId);

                var admin = await _repository
                    .Query<Models.Admin>()
                    .FirstOrDefaultAsync(r => r.Id == request.AdminId);

                var region = new Models.Region()
                {
                    Name = request.Name,
                    Country = country,
                    Admin = admin
                };

                await _repository.InsertAsync(region, cancellationToken);

                return Unit.Value;
            }
        }
    }
}