using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading;
using System.Threading.Tasks;
using Cwx.Winepad.Domain.Interfaces;
using Cwx.Winepad.Domain.Models;
using Cwx.Winepad.Domain.Segment.Features;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Swagger;

namespace Cwx.Winepad.WebApi.Controllers
{
    public class SegmentController : Controller
        
    {
        private readonly IMediator _mediator;

        public SegmentController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("segment")]
        public Task AddSegment([FromBody] AddSegment.Request request) => _mediator.Send(request);

        [HttpGet("segment")]
        public Task<GetSegment.Response> GetSegment([FromQuery] GetSegment.Request request) => _mediator.Send(request);

        [HttpPut("segment")]
        public Task UpdateSegment([FromBody] UpdateSegment.Request request) => _mediator.Send(request);

        [HttpGet("segments")]
        public Task<GetSegments.Response> GetSegments(GetSegments.Request request) => _mediator.Send(request);
    }
}