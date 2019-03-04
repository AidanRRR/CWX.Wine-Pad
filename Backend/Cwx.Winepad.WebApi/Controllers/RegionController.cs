using System.Threading.Tasks;
using Cwx.Winepad.Domain.Region.Features;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Cwx.Winepad.WebApi.Controllers
{
    public class RegionController : Controller
    {
        private readonly IMediator _mediator;

        public RegionController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("region")]
        public Task AddRegion([FromBody] AddRegion.Request request) => _mediator.Send(request);

        [HttpPut("region")]
        public Task UpdateRegion([FromBody] UpdateRegion.Request request) => _mediator.Send(request);

        [HttpGet("region")]
        public Task<GetRegion.Response> GetRegion([FromQuery] GetRegion.Request request) => _mediator.Send(request);

        [HttpGet("regions")]
        public Task<GetRegions.Response> GetRegions() => _mediator.Send(new GetRegions.Request());
    }
} 