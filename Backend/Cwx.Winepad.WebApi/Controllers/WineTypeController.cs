using System.Threading.Tasks;
using Cwx.Winepad.Domain.Wine.Features;
using Cwx.Winepad.Domain.WineType.Features;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Cwx.Winepad.WebApi.Controllers
{
    public class WineTypeController : Controller
    {
        private readonly IMediator _mediator;

        public WineTypeController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("wineType")]
        public Task AddWineType([FromBody] AddWineType.Request request) => _mediator.Send(request);

        [HttpPut("wineType")]
        public Task UpdateWineType([FromBody] UpdateWineType.Request request) => _mediator.Send(request);

        [HttpGet("wineType")]
        public Task<GetWineType.Response> getWineType([FromQuery] GetWineType.Request request) => _mediator.Send(request);

        [HttpGet("wineTypes")]
        public Task<GetWineTypes.Response> getWineTypes() => _mediator.Send(new GetWineTypes.Request());
    }
}