using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Cwx.Winepad.Domain.Interfaces;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Cwx.Winepad.Domain.Admin.Features
{
    public class UpdateAdmin
    {
        public class Request : IRequest
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public string Mailaddress { get; set; }
        }

        public class Validator : AbstractValidator<Request>
        {
            public Validator()
            {
                RuleFor(r => r.Name).NotEmpty();
                RuleFor(r => r.Mailaddress).NotEmpty();
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
                    .FirstOrDefaultAsync(a => a.Id == request.Id, cancellationToken);

                admin.Name = request.Name;
                admin.MailAddress = request.Mailaddress;

                await _repository.UpdateAsync(admin, cancellationToken);

                return Unit.Value;
            }
        }
    }
}