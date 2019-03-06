using System.Data;
using System.Reflection.PortableExecutable;
using System.Threading;
using System.Threading.Tasks;
using Cwx.Winepad.Domain.Interfaces;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Cwx.Winepad.Domain.Measure.Features
{
    public class UpdateMeasure
    {
        public class Request : IRequest
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public decimal Price { get; set; }
            public int WineId { get; set; }
        }

        public class Validator : AbstractValidator<Request>
        {
            public Validator()
            {
                RuleFor(r => r.Id).NotEmpty();
                RuleFor(r => r.Name).NotEmpty();
                RuleFor(r => r.Price).NotEmpty();
                RuleFor(r => r.WineId).NotEmpty();
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
                var wine = await _repository
                    .Query<Models.Wine>()
                    .FirstOrDefaultAsync(w => w.Id == request.WineId);

                var measure = await _repository
                    .Query<Models.Measure>()
                    .FirstOrDefaultAsync(m => m.Id == request.Id);

                measure.Name = request.Name;
                measure.Price = request.Price;
                measure.Wine = wine;

                _repository.UpdateAsync(measure, cancellationToken);

                return Unit.Value;
            }
        }
    }
}