using System.Collections.Generic;

namespace Cwx.Winepad.Domain.Models
{
    public class Segment : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Card Card { get; set; }
        public ICollection<SegmentWine> SegmentWines { get; set; }
    }
}