using System.Collections.Generic;
using System.Linq;
using Cwx.Winepad.Data.DAL;
using Cwx.Winepad.Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
                Name = "Spain",
                Code = "ESP"
            };
            _context.Add(newCountry);
            _context.SaveChanges();


            var newRegion = new Region()
            {
                Country = _context.Country.FirstOrDefault(c => c.Code == "ESP"),
                Name = "Côte de Blancs"
                
            };
            _context.Add(newRegion);
            _context.SaveChanges();


            var newWineType = new WineType()
            {
                Name = "Red"
            };
            _context.Add(newWineType);
            _context.SaveChanges();


            var newWine = new Wine()
            {
                Name = "Champagne Grand Cru",
                Year = 2017,
                Description =
                    "What is more impressive: the definition of aromas and flavors, or is it the wine’s sublime texture? The Initial is remarkable for its nuance, clarity and overall sense of harmony.",
                WineType = _context.WineType.FirstOrDefault(wt => wt.Name =="Red"),
                Region = _context.Region.FirstOrDefault(r => r.Name == "Côte de Blancs"),
                BottlePrice = 175
            };
            _context.Add(newWine);
            _context.SaveChanges();


            var newMeasure = new Measure()
            {
                Name = "0,5l Carafe",
                Wine = _context.Wine.FirstOrDefault(w => w.Name == "Champagne Grand Cru"),
                Price = 116.66m
            };
            _context.Add(newMeasure);
            _context.SaveChanges();


            var newCard = new Card();
            _context.Add(newCard);
            _context.SaveChanges();


            var newAdmin = new Admin()
            {
                Name = "Ronny"
            };
            _context.Add(newAdmin);
            _context.SaveChanges();


            var newSegment = new Segment()
            {
                Name = "By the glass",
                Card = _context.Card.Find(1)
            };
            _context.Add(newSegment);
            _context.SaveChanges();

            var cardAdmin = new CardAdmin()
            {
                Card = _context.Card.Find(1),
                Admin = _context.Admin.Find(1)
            };
            _context.Add(cardAdmin);
            _context.SaveChanges();


            var segmentWine = new SegmentWine()
            {
                Wine = _context.Wine.Find(1),
                Segment = _context.Segment.Find(1)
            };
            _context.Add(segmentWine);

            _context.SaveChanges();

            return Ok();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {
            var country = _context.Country.Find(id);

            var region = _context.Region.Include(r => r.Country)
                .FirstOrDefault(re => re.Id == id);

            var wineType = _context.WineType.Find(id);

            var card = _context.Card.Find(id);

            var measure = _context.Measure.Include(m => m.Wine)
                .FirstOrDefault(me => me.Id == id);

            var wine = _context.Wine.Include(w => w.Region)
                .Include(w => w.WineType)
                .FirstOrDefault(w => w.Id == id);

            var segment = _context.Segment.Include(s => s.Card)
                .FirstOrDefault(s => s.Id == id);

            var admin = _context.Admin.Find(id);

            return Ok();
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
        public void Put([FromBody] CountryDto country)
        {
            // Stap 1: entity ophalen
            // Stap 2: entity properties aanpassen, (MAPPEN)
            // Stap 3: entity saven

            var entity = _context.Country.FirstOrDefault(c => c.Id == country.Id);
            entity.Name = country.Name;
            entity.Code = country.Code;
            
            _context.SaveChanges();


            //Country countryToUpdate = _context.Country.FirstOrDefault(c => c.Id == id);
            //if (countryToUpdate != null)
            //{
            //    countryToUpdate.Name = updatedCountry.Name;
            //    countryToUpdate.Code = updatedCountry.Code;
            //    _context.SaveChanges();
            //}

            //Wine wineToUpdate = _context.Wine.FirstOrDefault(w => w.Id == id);
            //if (wineToUpdate != null)
            //{

            //}
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            //Wijn wordt verwijdert met measure EN SegmentWine
            var someWine = _context.Wine
                .Include(w => w.Measures)
                .Include(w => w.Region)
                .Include(w => w.Region.Country)
                .Include(w => w.SegmentWines)
                .FirstOrDefault(w => w.Id == id);

            _context.Remove(someWine);
            _context.SaveChanges();


            //verwijdert Admin. samen met de rij in CardAdmin
            Admin adminDelete = _context.Admin
                .Include(a=>a.CardAdmins)
                .FirstOrDefault(a=>a.Id == id);

            _context.Remove(adminDelete);
            _context.SaveChanges();

            //verwijdert Segment zonder card
            Segment segmentToDelete = _context.Segment.Include(s => s.SegmentWines)
                .Include(s => s.Card)
                .Include(s => s.SegmentWines)
                .FirstOrDefault(s => s.Id == id);

            _context.Segment.Remove(segmentToDelete);
            _context.SaveChanges();

            //Verwijdert alle segmenten als je een card verwijdert --> Segmenten kunnen niet leven zonder Card.
            Card card = _context.Card
                .Include(c => c.Segments)
                .FirstOrDefault(c => c.Id == id);

            _context.Card.Remove(card);
            _context.SaveChanges();

        }
    }
}
