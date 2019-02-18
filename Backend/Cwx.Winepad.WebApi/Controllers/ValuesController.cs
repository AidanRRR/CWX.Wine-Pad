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

        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            var countries = _context.Country.ToList();

            return new string[] { "value1", "value2" };


        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            var country = _context.Country.Find(id);
            return "value";
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
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
