using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Cwx.Winepad.Domain.Interfaces;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Mvc.Internal;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Cwx.Winepad.Domain.Country.Features
{
    public class GetCountries
    {
        public class Request : IRequest<Response> { }

        public class Response
        {
            
            public Response(List<Models.Country> countries)
            {
                Country = countries;
            }

            public List<Models.Country> Country { get; set; }
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
                var countries = await _repository
                    .Query<Models.Country>()
                    .ToListAsync(cancellationToken);

                return new Response(countries);
            }
        }
    }
}