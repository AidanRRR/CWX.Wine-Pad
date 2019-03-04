using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Cwx.Winepad.Domain.Interfaces;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Cwx.Winepad.Domain.WineType.Features
{
    public class GetWineTypes
    {
        public class Request : IRequest<Response>{}

        public class Response
        {
            public List<Models.WineType> WineTypes { get; set; }

            public Response(List<Models.WineType> wineTypes)
            {
                WineTypes = wineTypes;
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
                var wineTypes = await _repository
                    .Query<Models.WineType>()
                    .ToListAsync(cancellationToken);

                return new Response(wineTypes);
            }
        }

        
    }
}