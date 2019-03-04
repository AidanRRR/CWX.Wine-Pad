using System.Threading;
using System.Threading.Tasks;
using Cwx.Winepad.Domain.Interfaces;
using FluentValidation;
using MediatR;

namespace Cwx.Winepad.Domain.Admin.Features
{
    public class AddAdmin 
    {
        public class Request : IRequest
        {
            public string Name { get; set; }
            public string Email { get; set; }
        }

        public class Validator : AbstractValidator<Request>
        {
            public Validator()
            {
                RuleFor(r => r.Name).NotEmpty();
                RuleFor(r => r.Email).NotEmpty();
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
                var admin = new Models.Admin
                {
                    Name = request.Name,
                    Email = request.Email
                };

                await _repository.InsertAsync(admin, cancellationToken);

               return Unit.Value;
            }
        }
    }
}