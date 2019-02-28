using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Cwx.Winepad.Domain.Country.Features;
using Cwx.Winepad.Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Cwx.Winepad.Domain.Admin.Features
{
    public class GetAdmins
    {
        public class Request : IRequest<Response>
        {

        }

        public class Response
        {
            public List<Models.Admin> Admins { get; set; }
            public Response(List<Models.Admin> admins)
            {
                Admins = admins;
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
                var admins = await _repository
                    .Query<Models.Admin>()
                    .ToListAsync(cancellationToken);

                return new Response(admins);
            }
        }
    }
}