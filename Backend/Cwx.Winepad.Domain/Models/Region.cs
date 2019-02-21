using System.Collections.Generic;
using Cwx.Winepad.Infrastructure.Entities;

namespace Cwx.Winepad.Domain.Models
{
    public class Region : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Country Country { get; set; }
        public ICollection<Wine> Wines { get; set; }
    }
}