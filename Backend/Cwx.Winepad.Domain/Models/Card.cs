    using System.Collections.Generic;

    namespace Cwx.Winepad.Domain.Models
{
    public class Card : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<CardAdmin> CardAdmins { get; set; }
        public Admin Owner { get; set; }
        public ICollection<Segment> Segments { get; set; }
    }
}