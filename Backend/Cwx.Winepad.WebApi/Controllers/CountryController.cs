using Cwx.Winepad.Domain.Country.Features;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Cwx.Winepad.Domain.Models;

namespace Cwx.Winepad.WebApi.Controllers
{
    public class CountryController : Controller
    {
        private readonly IMediator _mediator;

        public CountryController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("country")]
        //FromBody bind de data 
        public Task AddCountry([FromBody] AddCountry.Request request) => _mediator.Send(request);

        [HttpPut("country")]
        // FromBody Haalt  de data uit de request body van de http request (na de header) --> Osi model
        public Task UpdateCountry([FromBody] UpdateCountry.Request request) => _mediator.Send(request);

        [HttpGet("country")]
        //FromQuery haalt de parameters uit de URL
        public Task<GetCountry.Response> GetCountry([FromQuery] GetCountry.Request request) => _mediator.Send(request);

        [HttpGet("countries")] //[FromUri] id moet  je niet definieeren,  is by default. De rest is wel uit body request, wel definieeren
        public Task<GetCountries.Response> GetCountries() => _mediator.Send(new GetCountries.Request());

    }
}