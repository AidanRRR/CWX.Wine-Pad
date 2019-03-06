using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Cwx.Winepad.Domain.Interfaces;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Cwx.Winepad.Domain.Measure.Features
{
    public class GetMeasures
    {
        public class Request : IRequest<Response> { }

        public class Response
        {
            public List<Models.Measure> Measures { get; set; }

            public Response(List<Models.Measure> measures)
            {
                Measures = measures;
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
                var measures = await _repository
                    .Query<Models.Measure>()
                    .ToListAsync(cancellationToken);

                return new Response(measures);
            }
        }
    }
}