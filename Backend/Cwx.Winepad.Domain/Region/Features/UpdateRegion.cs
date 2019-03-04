using System.Threading;
using System.Threading.Tasks;
using Cwx.Winepad.Domain.Interfaces;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Cwx.Winepad.Domain.Region.Features
{
    public class UpdateRegion
    {
        public class Request : IRequest
        {
            public int Id { get; set; }
            public string Name { get; set; }
        }

        public class Validator : AbstractValidator<Request>
        {
            public Validator()
            {
                RuleFor(r => r.Name).NotEmpty();
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
                var region = await _repository
                    .Query<Models.Region>()
                    .FirstOrDefaultAsync(r => r.Id == request.Id);

                region.Name = request.Name;

                await _repository.UpdateAsync(region, cancellationToken);

                return Unit.Value;

            }
        }
    }

    
}