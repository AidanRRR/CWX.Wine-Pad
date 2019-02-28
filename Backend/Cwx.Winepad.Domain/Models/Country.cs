using System.Collections.Generic;
using System.Reflection.Metadata.Ecma335;

namespace Cwx.Winepad.Domain.Models
{
    public class Country: IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public Admin Admin { get; set; } 
        public ICollection<Region> Regions { get; set; } = new List<Region>();
    }
}