using System.Threading.Tasks;
using Cwx.Winepad.Domain.Wine.Features;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Cwx.Winepad.WebApi.Controllers
{
    public class WineController : Controller
    {
        private readonly IMediator _mediator;

        public WineController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("wine")]
        public Task <GetWine.Response> GetWine ([FromQuery] GetWine.Request request) => _mediator.Send(request);

        [HttpPost("wine")]
        public Task AddWine([FromBody] AddWine.Request request) => _mediator.Send(request);

        [HttpPut("wine")]
        public Task UpdateWine([FromBody] UpdateWine.Request request) => _mediator.Send(request);

        [HttpGet("wines")]
        public Task<GetWines.Response> GetWines([FromQuery] GetWines.Request request) => _mediator.Send(request);


    }
}