using System.Collections.Generic;

namespace Cwx.Winepad.Domain.Models
{
    public class Region : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Country Country { get; set; }
        public Admin Admin { get; set; }
        public ICollection<Wine> Wines { get; set; }
    }
}