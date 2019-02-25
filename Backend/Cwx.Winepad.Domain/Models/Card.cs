    using System.Collections.Generic;

    namespace Cwx.Winepad.Domain.Models
{
    public class Card : IEntity
    {
        public int Id { get; set; }
        public ICollection<Segment> Segments { get; set; }
    }
}