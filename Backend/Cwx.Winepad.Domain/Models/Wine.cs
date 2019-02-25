using System.Collections.Generic;

namespace Cwx.Winepad.Domain.Models
{
    public class Wine : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual Region Region { get; set; }
        public int Year { get; set; }
        public string Description { get; set; }
        public WineType WineType { get; set; }
        public decimal? CarafePrice { get; set; }
        public decimal GlassPrice { get; set; }
        public decimal BottlePrice { get; set; }
        public virtual ICollection<SegmentWine> SegmentWines { get; set; }
        public virtual ICollection<Measure> Measures { get; set; }
    }

}