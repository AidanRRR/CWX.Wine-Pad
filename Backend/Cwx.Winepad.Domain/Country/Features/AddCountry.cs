﻿using System.Threading;
using System.Threading.Tasks;
using Cwx.Winepad.Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Cwx.Winepad.Domain.Country.Features
{
    public class AddCountry
    {
        public class Request : IRequest
        {
            public string Name { get; set; }
            public string Code { get; set; }
        }

        public class Handler : IRequestHandler<Request>
        {
            private readonly IRepository _repository;

            public Handler(IRepository repository)
            {
                _repository = repository;
            }

            public async Task<Unit> Handle(Request request, CancellationToken cancellationToken)
            {
                var country = new Models.Country()
                {
                    Code = request.Code,
                    Name = request.Name
                };

                await _repository.InsertAsync(country, cancellationToken);

                return Unit.Value;
            }
        }
    }
}