using System.Runtime.InteropServices;
using System.Threading;
using System.Threading.Tasks;
using Cwx.Winepad.Domain.Interfaces;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Cwx.Winepad.Domain.Measure.Features
{
    public class GetMeasure
    {
        public class Request : IRequest<Response>
        {
            public int Id { get; set; }
        }

        public class Response
        {
            public Models.Measure Measure { get; set; }

            public Response(Models.Measure measure)
            {
                Measure = measure;
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
                var measure = await _repository
                    .Query<Models.Measure>()
                    .Include(m=>m.Wine)
                    .FirstOrDefaultAsync(s => s.Id == request.Id);

                return new Response(measure);

            }
        }
    }
}