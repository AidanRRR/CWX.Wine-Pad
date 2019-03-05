using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Cwx.Winepad.Domain.Interfaces;
using FluentValidation;
using MediatR;

namespace Cwx.Winepad.Domain.Segment.Features
{
    public class AddSegment
    {
        public class Request : IRequest
        {
            public string Name { get; set; }
            public int CardId { get; set; }

        }

        public class Validator : AbstractValidator<Request>
        {
            public Validator()
            {
                RuleFor(r => r.Name).NotEmpty();
                RuleFor(r => r.CardId).NotEmpty();
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
                var card = _repository
                    .Query<Models.Card>()
                    .FirstOrDefault(c => c.Id == request.CardId);

                var segment = new Models.Segment()
                {
                    Name = request.Name,
                    Card = card
                };

                await _repository.InsertAsync(segment, cancellationToken);

                return Unit.Value;
            }
        }
    }
}