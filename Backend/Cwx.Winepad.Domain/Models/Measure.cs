using System;

namespace Cwx.Winepad.Domain.Models
{
    public class Measure : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public Wine Wine { get; set; }
    }
}