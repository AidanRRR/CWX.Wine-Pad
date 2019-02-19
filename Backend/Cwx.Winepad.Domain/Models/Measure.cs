using Cwx.Winepad.Infrastructure.Entities;

namespace Cwx.Winepad.Domain.Models
{
    public class Measure : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int WineId { get; set; }
        public Wine Wine { get; set; }

    }
}