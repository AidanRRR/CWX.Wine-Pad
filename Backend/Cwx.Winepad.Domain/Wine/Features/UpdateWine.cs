using System.Data;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading;
using System.Threading.Tasks;
using Cwx.Winepad.Domain.Admin.Features;
using Cwx.Winepad.Domain.Interfaces;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Cwx.Winepad.Domain.Wine.Features
{
    public class UpdateWine
    {
        public class Request : IRequest
        {
            public int Id { get; set; }
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
                RuleFor(r => r.Id).NotEmpty();
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
                var region = _repository
                    .Query<Models.Region>()
                    .FirstOrDefault(r => r.Id == request.RegionId);

                var wineType = _repository
                    .Query<Models.WineType>()
                    .FirstOrDefault(wt => wt.Id == request.WineTypeId);

                var admin = _repository
                    .Query<Models.Admin>()
                    .FirstOrDefault(a => a.Id == request.AdminId);

                var wine = await _repository
                    .Query<Models.Wine>()
                    .Include(w=>w.Region)
                    .Include(w=>w.WineType)
                    .Include(w=>w.Admin)
                    .FirstOrDefaultAsync(w => w.Id == request.Id);

                wine.Region = region;
                wine.WineType = wineType;
                wine.Admin = admin;
                wine.Description = request.Description;
                wine.Year = request.Year;
                wine.Name = request.Name;
                wine.BottlePrice = request.BottlePrice;
                wine.GlassPrice = request.GlassPrice;
                wine.CarafePrice = request.CarafePrice;

                await _repository.UpdateAsync(wine, cancellationToken);

                return Unit.Value;
            }
        }

        
    }
}