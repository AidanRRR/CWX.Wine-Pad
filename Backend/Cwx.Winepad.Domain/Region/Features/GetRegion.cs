using System.Threading;
using System.Threading.Tasks;
using Cwx.Winepad.Domain.Interfaces;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Cwx.Winepad.Domain.Region.Features
{
    public class GetRegion
    {
        public class Request : IRequest<Response>
        {
            public int Id { get; set; }
        }

        public class Response
        {
            public Models.Region Region { get; set; }

            public Response(Models.Region region)
            {
                Region = region;
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
                var region = await _repository
                    .Query<Models.Region>()
                    .Include(r => r.Country)
                    .FirstOrDefaultAsync(r => r.Id == request.Id);

                return new Response(region);

            }
        }
    }
}