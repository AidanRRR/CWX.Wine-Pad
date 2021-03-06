﻿using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Cwx.Winepad.Domain.Interfaces;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Remotion.Linq.Clauses;

namespace Cwx.Winepad.Domain.Card.Features
{
    public class GetCard
    {
        public class Request : IRequest<Response>
        {
            public int Id { get; set; }
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

        public class Handler : IRequestHandler<Request, Response>
        {
            private readonly IRepository _repository;

            public Handler(IRepository repository)
            {
                _repository = repository;
            }

            public async Task<Response> Handle(Request request, CancellationToken cancellationToken)
            {
                var card = await _repository
                    .Query<Models.Card>()
                    .Include(c=>c.CardAdmins)
                    
                    //.Include(c=>c.Segments)
                    //.ThenInclude(s=>s.Name)
                    .FirstOrDefaultAsync(c => c.Id == request.Id, cancellationToken);

                return new Response(card);
            }
        }
    }
}