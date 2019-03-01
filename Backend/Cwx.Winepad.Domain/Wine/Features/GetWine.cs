using System.Threading;
using System.Threading.Tasks;
using Cwx.Winepad.Domain.Country.Features;
using Cwx.Winepad.Domain.Interfaces;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Cwx.Winepad.Domain.Wine.Features
{
    public class GetWine
    {
        public class Request : IRequest<Response>
        {
            public int Id { get; set; }
        }

        public class Response
        {
            public Response(Models.Wine wine)
            {
                Wine = wine;
            }

            public Models.Wine Wine { get; set; }
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
                    var wine = await _repository
                        .Query<Models.Wine>()
                        .Include(w => w.WineType)
                        .Include(w => w.Region)
                        .Include(w => w.Admin)
                        .Include(w => w.Measures)
                        .Include(w => w.SegmentWines)
                        .FirstOrDefaultAsync(w => w.Id == request.Id, cancellationToken);

                return new Response(wine);
            }
        }
    }
}