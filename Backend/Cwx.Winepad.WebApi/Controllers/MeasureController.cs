using System.Threading.Tasks;
using Cwx.Winepad.Domain.Measure.Features;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Cwx.Winepad.WebApi.Controllers
{
    public class MeasureController : Controller
    {
        private readonly IMediator _mediator;

        public MeasureController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("measure")]
        public Task AddMeasure([FromBody] AddMeasure.Request request) => _mediator.Send(request);

        [HttpGet("measure")]
        public Task<GetMeasure.Response> GetMeasure([FromQuery] GetMeasure.Request request) => _mediator.Send(request);
    }
}