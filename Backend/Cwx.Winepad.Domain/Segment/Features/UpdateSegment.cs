using System.Threading;
using System.Threading.Tasks;
using Cwx.Winepad.Domain.Interfaces;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Cwx.Winepad.Domain.Segment.Features
{
    public class UpdateSegment
    {
        public class Request : IRequest
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public int CardId { get; set; }
        }

        public class Validator : AbstractValidator<Request>
        {
            public Validator()
            {
                RuleFor(r => r.Id).NotEmpty();
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
                var segment = await _repository
                    .Query<Models.Segment>()
                    .FirstOrDefaultAsync(s => s.Id == request.Id);

                var card = await _repository
                    .Query<Models.Card>()
                    .FirstOrDefaultAsync(c => c.Id == request.CardId);

                segment.Name = request.Name;

                if (request.CardId != null)
                {
                    segment.Card = card;
                }

                await _repository.UpdateAsync(segment, cancellationToken);
                await _repository.UpdateAsync(segment, cancellationToken);
                return Unit.Value;
            }
        }

    }
}