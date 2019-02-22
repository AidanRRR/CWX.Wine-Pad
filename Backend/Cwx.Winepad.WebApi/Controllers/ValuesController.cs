﻿using System.Collections.Generic;
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
//            var someWine = _context.Wine
//                .Include(w => w.Measures)
//                .Include(w => w.Region)
//                .Include(w => w.Region.Country)
//                .FirstOrDefault(w=>w.Id == id);
//
//            _context.Remove(someWine);
//            _context.SaveChanges();

            Region someRegion = _context.Region.Include(r =>r.Country)
                .FirstOrDefault(r => r.Id == id);
            _context.Remove(someRegion);
            _context.SaveChanges();




            //_context.RemoveRange(regionToDelete.Wines);            

            //WineType wineTypeToDelete = _context.WineType.FirstOrDefault(wt => wt.Id == id);
            //_context.WineType.Remove(wineTypeToDelete);

            //_context.SaveChanges();
        }
    }
}
