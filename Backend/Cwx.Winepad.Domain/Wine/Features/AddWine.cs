using System.Data;
using System.Runtime.CompilerServices;
using System.Threading;
using System.Threading.Tasks;
using Cwx.Winepad.Domain.Interfaces;
using Cwx.Winepad.Domain.Models;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Cwx.Winepad.Domain.Wine.Features
{
    public class AddWine
    {
        public class Request : IRequest
        {
            public string Name { get; set; }
            public int RegionId { get; set; }
            public int Year { get; set; }
            public string Description { get; set; }
            public int WineTypeId { get; set; }
            public decimal? CarafePrice { get; set; }
            public decimal? GlassPrice { get; set; }
            public decimal? BottlePrice { get; set; }
            public int AdminId { get; set; }
        }

        public class Validator : AbstractValidator<Request>
        {
            public Validator()
            {
                RuleFor(r => r.Name).NotEmpty();
                RuleFor(r => r.Year).NotEmpty();
                RuleFor(r => r.Description).NotEmpty();
                RuleFor(r => r.AdminId).NotEmpty();
                RuleFor(r => r.RegionId).NotEmpty();
                RuleFor(r => r.WineTypeId).NotEmpty();
            }
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
                var admin = await _repository
                    .Query<Models.Admin>()
                    .FirstOrDefaultAsync(a => a.Id == request.AdminId, cancellationToken: cancellationToken);

                var region = await _repository
                    .Query<Models.Region>()
                    .FirstOrDefaultAsync(r => r.Id == request.RegionId, cancellationToken);

                var wineType = await _repository
                    .Query<Models.WineType>()
                    .FirstOrDefaultAsync(wt => wt.Id == request.WineTypeId, cancellationToken);


                var wine = new Models.Wine()
                {
                    Name = request.Name,
                    Region = region,
                    Year = request.Year,
                    Description = request.Description,
                    WineType = wineType,
                    CarafePrice = request.CarafePrice,
                    GlassPrice = request.GlassPrice,
                    BottlePrice = request.BottlePrice,
                    Admin = admin
                };

                await _repository.InsertAsync(wine, cancellationToken);

                return Unit.Value;
            }
        }
    }
}