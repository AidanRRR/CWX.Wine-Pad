using System.Threading;
using System.Threading.Tasks;
using Cwx.Winepad.Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Cwx.Winepad.Domain.Country.Features
{
    public class UpdateCountry
    {
        public class Request : IRequest
        {
            public int Id { get; set; }
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
                var country = await _repository.Query<Models.Country>()
                    .FirstOrDefaultAsync(c => c.Id == request.Id, cancellationToken);

                country.Code = request.Code;
                country.Name = request.Name;

                await _repository.UpdateAsync(country, cancellationToken);

                return Unit.Value;
            }
        }
    }
}