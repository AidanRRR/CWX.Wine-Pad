using System.Threading;
using System.Threading.Tasks;
using Cwx.Winepad.Domain.Interfaces;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore.Query.ExpressionVisitors.Internal;

namespace Cwx.Winepad.Domain.Card.Features
{
    public class AddCard
    {
        public class Request : IRequest
        {
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
                var card = new Models.Card()
                {
                    Name = request.Name
                };

                await _repository.InsertAsync(card, cancellationToken);
                return Unit.Value;
            }
            
        }
    }
}