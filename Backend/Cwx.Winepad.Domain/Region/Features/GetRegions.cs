using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Cwx.Winepad.Domain.Interfaces;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Cwx.Winepad.Domain.Region.Features
{
    public class GetRegions
    {
        public class Request : IRequest<Response> { }

        public class Response
        {
            public List<Models.Region> Regions { get; set; }

            public Response(List<Models.Region> regions)
            {
                Regions = regions;
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
                var regions = await _repository
                    .Query<Models.Region>()
                    .ToListAsync(cancellationToken);

                return new Response(regions);
            }
        }
    }
}