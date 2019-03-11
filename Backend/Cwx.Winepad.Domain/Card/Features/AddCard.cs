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
using Remotion.Linq.Clauses;

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
                // Card entiteit aanmaken
                var card = new Models.Card { Name = request.Name };

                // Als er admins meegeven zijn, deze toevoegen
                if (request.AdminIds != null)
                {
                    AddAdminsToCard(request.AdminIds, card, cancellationToken);
                }

                // Owner toevoegen aan card
                AddOwnerToCard(card, request.OwnerId, cancellationToken);

                // Card toevoegen in onze database
                await _repository.InsertAsync(card, cancellationToken);

                return Unit.Value;
            }

            private async void AddOwnerToCard(Models.Card card, int ownerId, CancellationToken cancellationToken)
            {
                var cardOwner = await GetOwner(ownerId, cancellationToken);

                card.Owner = cardOwner;
                card.CardAdmins.Add(new CardAdmin
                {
                    Admin = cardOwner,
                    Card = card
                });
            }

            private async void AddAdminsToCard(List<int> adminIds, Models.Card card, CancellationToken cancellationToken)
            {
                var admins = await GetAdmins(adminIds, cancellationToken);
                var cardAdmins = MapAdminsToCardAdmins(card, admins);

                card.CardAdmins = cardAdmins;
            }

            private Task<Models.Admin> GetOwner(int id, CancellationToken cancellationToken)
            {
                return _repository
                    .Query<Models.Admin>()
                    .FirstOrDefaultAsync(a => a.Id == id, cancellationToken);
            }

            private Task<List<Models.Admin>> GetAdmins(List<int> adminIds, CancellationToken cancellationToken)
            {
                return _repository
                    .Query<Models.Admin>()
                    .Where(a => adminIds.Contains(a.Id))
                    .ToListAsync(cancellationToken);
            }

            private List<CardAdmin> MapAdminsToCardAdmins(Models.Card card, List<Models.Admin> admins)
            {
                var cardAdmins = new List<CardAdmin>();

                foreach (var admin in admins)
                {
                    var cardAdmin = new CardAdmin()
                    {
                        Card = card,
                        Admin = admin
                    };

                    cardAdmins.Add(cardAdmin);
                }

                return cardAdmins;
            }
        }
    }
}