using System.Threading.Tasks;
using Cwx.Winepad.Domain.Card.Features;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Cwx.Winepad.WebApi.Controllers
{
    public class CardController : Controller
    {
        private readonly IMediator _mediator;

        public CardController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("card")]
        public Task AddCard([FromBody] AddCard.Request request) => _mediator.Send(request);

        [HttpGet("card")]
        public Task<GetCard.Response> GetCard([FromQuery] GetCard.Request request) => _mediator.Send(request);

        [HttpGet("cards")]
        public Task<GetCards.Response> GetCards() => _mediator.Send(new GetCards.Request());

        [HttpPut("card")]
        public Task UpdateCard([FromBody] UpdateCard.Request request) => _mediator.Send(request);
    }
}