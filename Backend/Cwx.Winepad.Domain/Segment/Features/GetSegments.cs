using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Cwx.Winepad.Domain.Interfaces;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Cwx.Winepad.Domain.Segment.Features
{
    public class GetSegments
    {
        public class Request : IRequest<Response> { }

        public class Response
        {
            public List<Models.Segment> Segments { get; set; }
            public Response(List<Models.Segment>segments)
            {
                Segments = segments;
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
                var segments = await _repository
                    .Query<Models.Segment>()
                    .Include(s=>s.Card)
                    .ToListAsync(cancellationToken);

                return new Response(segments);
            }
        }
       
    }
}