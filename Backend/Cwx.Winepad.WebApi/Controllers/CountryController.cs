using Cwx.Winepad.Domain.Country.Features;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

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

        [HttpPost("countries")]
        public Task AddCountries([FromBody] AddCountries.Request request) => _mediator.Send(request);

        //List of countries : https://gist.githubusercontent.com/keeguon/2310008/raw/bdc2ce1c1e3f28f9cab5b4393c7549f38361be4e/countries.json

    }
}