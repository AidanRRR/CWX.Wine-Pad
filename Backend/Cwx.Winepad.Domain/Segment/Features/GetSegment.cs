using System.Threading;
using System.Threading.Tasks;
using Cwx.Winepad.Domain.Interfaces;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Cwx.Winepad.Domain.Segment.Features
{
    public class GetSegment
    {
        public class Request : IRequest<Response>
        {
            public int Id { get; set; }
        }

        public class Response
        {
            public Models.Segment Segment { get; set; }

            public Response(Models.Segment segment)
            {
                Segment = segment;
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
                var Segment = await _repository
                    .Query<Models.Segment>()
                    .FirstOrDefaultAsync(s => s.Id == request.Id);

                return new Response(Segment);
            }
        }
    }
}