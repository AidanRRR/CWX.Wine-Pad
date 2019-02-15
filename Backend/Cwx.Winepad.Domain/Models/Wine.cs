﻿using System.Collections.Generic;
using Cwx.Winepad.Infrastructure.Entities;

namespace Cwx.Winepad.Domain.Models
{
    public class Wine : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int RegionId { get; set; }
        public Region Region { get; set; }
        public int Year { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public int WineTypeId { get; set; }
        public WineType WineType { get; set; }
        public decimal CarafePrice { get; set; }
        public decimal GlassPrice { get; set; }
        public decimal BottlePrice { get; set; }
        public List<Measure> Measures { get; set; }
    }

}