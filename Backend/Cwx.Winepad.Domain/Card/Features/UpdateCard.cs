using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Cwx.Winepad.Domain.Interfaces;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Cwx.Winepad.Domain.Card.Features
{
    public class UpdateCard
    {
        public class Request : IRequest
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public int AdminId { get; set; }
        }

        public class Response
        {
            public Models.Card Card { get; set; }

            public Response(Models.Card card)
            {
                Card = card;
            }
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
                var admin = _repository.Query<Models.CardAdmin>()
                    .FirstOrDefaultAsync(ca => ca.Admin.Id == request.AdminId);

                var card = await _repository
                    .Query<Models.Card>()
                    .Include(c=>c.Segments)
                    .FirstOrDefaultAsync(c => c.Id == request.Id, cancellationToken);

                card.Id = request.Id;
                card.Name = request.Name;

                await _repository.UpdateAsync(card, cancellationToken);

                return  Unit.Value;
            }
        }
    }
}