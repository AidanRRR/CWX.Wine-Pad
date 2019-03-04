using System.Collections.Generic;
using System.Reflection.PortableExecutable;
using System.Threading;
using System.Threading.Tasks;
using Cwx.Winepad.Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Cwx.Winepad.Domain.Card.Features
{
    public class GetCards
    {
         public class Request : IRequest<Response> { }

         public class Response
         {
             public List<Models.Card> Card { get; set; }

             public Response(List<Models.Card> card)
             {
                 Card = card;
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
                var cards = await _repository
                    .Query<Models.Card>()
                    .ToListAsync(cancellationToken);

                return new Response(cards);
            }
         }

    }
}