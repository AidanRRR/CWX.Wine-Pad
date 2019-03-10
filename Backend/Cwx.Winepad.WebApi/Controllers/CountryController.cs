using Cwx.Winepad.Domain.Country.Features;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Web.Http.Cors;
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
        public Task AddCountry([FromBody] AddCountry.Request request) => _mediator.Send(request);

        [HttpPut("country")]
        public Task UpdateCountry([FromBody] UpdateCountry.Request request) => _mediator.Send(request);

        [HttpGet("country")]
        public Task<GetCountry.Response> GetCountry([FromQuery] GetCountry.Request request) => _mediator.Send(request);

        [HttpGet("countries")] 
        public Task<GetCountries.Response> GetCountries() => _mediator.Send(new GetCountries.Request());

    }
}