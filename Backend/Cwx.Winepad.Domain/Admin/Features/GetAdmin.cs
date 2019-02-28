using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Cwx.Winepad.Domain.Country.Features;
using Cwx.Winepad.Domain.Interfaces;
using FluentValidation;
using MediatR;

namespace Cwx.Winepad.Domain.Admin.Features
{
    public class GetAdmin
    {
        //Hoe moet de request er uit zien? De request is van het type response die je eronder declareert.
        //GetAdmin moeten we een Id meekrijgen.
        public class Request : IRequest<Response>
        {
            public int Id { get; set; }
        }

        //gezien we een admin willen opvragen zal de response ons het Admin model teruggeven.
        public class Response
        {
            public Models.Admin Admin { get; set; }

            public Response(Models.Admin admin)
            {
                Admin = admin;
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
                var admin = _repository
                    .Query<Models.Admin>()
                    .FirstOrDefault(a => a.Id == request.Id);
                return new Response(admin);
            }
        }
    }
}