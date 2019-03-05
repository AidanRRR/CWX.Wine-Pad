using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Cwx.Winepad.Domain.Interfaces;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Cwx.Winepad.Domain.Wine.Features
{
    public class GetWines
    {
        public class Request : IRequest<Response>
        {
        }

        public class Response
        {
            public List<Models.Wine> Wines { get; set; }

            public Response(List<Models.Wine> wines)
            {
                Wines = wines;
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
                var wines = await _repository
                    .Query<Models.Wine>()
                    .ToListAsync(cancellationToken);

                return new Response(wines);
            }
        }
    }
}