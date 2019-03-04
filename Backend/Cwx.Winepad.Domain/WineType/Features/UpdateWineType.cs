using System.Threading;
using System.Threading.Tasks;
using Cwx.Winepad.Domain.Interfaces;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Cwx.Winepad.Domain.WineType.Features
{
    public class UpdateWineType
    {
        public class Request : IRequest
        {
            public int id { get; set; }
            public string Name { get; set; }
        }

        public class Validator : AbstractValidator<Request>
        {
            public Validator()
            {
                RuleFor(r => r.id).NotEmpty();
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
                var wineType = await _repository
                    .Query<Models.WineType>()
                    .FirstOrDefaultAsync(r => r.Id == request.id);

                wineType.Name = request.Name;

                await _repository.UpdateAsync(wineType, cancellationToken);

                return Unit.Value;;
            }
        }
    }
}