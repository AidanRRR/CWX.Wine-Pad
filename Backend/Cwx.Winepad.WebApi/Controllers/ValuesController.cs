using System.Collections.Generic;
using System.Linq;
using Cwx.Winepad.Data.DAL;
using Cwx.Winepad.Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace Cwx.Winepad.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly WinePadContext _context;

        public ValuesController(WinePadContext context)
        {
            _context = context;
        }

        //GET api/values
       [HttpGet]
        public ActionResult Get()
        {
            var newCountry = new Country()
            {
                Name = "Argentina",
                Code = "ARG"
            };
            _context.Add(newCountry);

            var newRegion = new Region()
            {
                Country = _context.Country.Find(1),
                Name = "Côte de Blancs",
            };
            _context.Add(newRegion);

            var newWineType = new WineType()
            {
                Name = "Red"
            };
            _context.Add(newWineType);

            var newWine = new Wine()
            {
                Name = "Champagne Grand Cru",
                Year = 2017,
                Description = "What is more impressive: the definition of aromas and flavors, or is it the wine’s sublime texture? The Initial is remarkable for its nuance, clarity and overall sense of harmony.",
                WineType = _context.WineType.Find( 1),
                Region = _context.Region.Find(2),
                BottlePrice  = 175
            };
            _context.Add(newWine);
            _context.SaveChanges();
           
            return Ok();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<Country> Get(int id)
        {
            var country = _context.Country.Find(id);
            return country;
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] Country countryToCreate)
        {
            _context.Add(countryToCreate);
            _context.SaveChanges();
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Country updatedCountry)
        {
            Country countryToUpdate = _context.Country.FirstOrDefault(c => c.Id == id);
            if (countryToUpdate != null)
            {
                countryToUpdate.Name = updatedCountry.Name;
                countryToUpdate.Code = updatedCountry.Code;
                _context.SaveChanges();
            }
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            Country countryToDelete = _context.Country.FirstOrDefault(c => c.Id == id);
            _context.Country.Remove(countryToDelete);
            _context.SaveChanges();
        }
    }
}
