using System.Threading.Tasks;
using Cwx.Winepad.Domain.Region.Features;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Cwx.Winepad.WebApi.Controllers
{
    public class RegionController
    {
        private readonly IMediator _mediator;

        public RegionController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("region")]
        public Task AddRegion([FromBody] AddRegion.Request request) => _mediator.Send(request);
    }
}   