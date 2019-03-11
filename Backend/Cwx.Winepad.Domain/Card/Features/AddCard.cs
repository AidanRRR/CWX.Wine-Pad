using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Cwx.Winepad.Domain.Interfaces;
using Cwx.Winepad.Domain.Models;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.ExpressionVisitors.Internal;

namespace Cwx.Winepad.Domain.Card.Features
{
    public class AddCard
    {
        public class Request : IRequest
        {
            public string Name { get; set; }
            public int OwnerId { get; set; }
            public List<int> AdminIds { get; set; }
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
                    Name = request.Name,
                };

                var owner = await _repository.Query<Models.Admin>()
                    .FirstOrDefaultAsync(a => a.Id == request.OwnerId, cancellationToken);

                var cardAdmins = new List<CardAdmin>();

                // Hier een lijst van admins die uit onze database komt die gelijk zijn aan (containen) de ids die uit de request komen

                var admins = new List<Models.Admin>();
                admins.ForEach(admin =>
                {
                    var cardAdmin = new CardAdmin()
                    {
                        Admin = admin,
                        Card = card
                    };

                    cardAdmins.Add(cardAdmin);
                });

                card.CardAdmins = cardAdmins;
                card.Owner = owner;

                await _repository.InsertAsync(card, cancellationToken);

                return Unit.Value;
            }
            
        }
    }
}