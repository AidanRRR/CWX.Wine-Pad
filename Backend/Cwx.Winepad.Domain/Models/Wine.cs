using Cwx.Winepad.Infrastructure.Entities;

namespace Cwx.Winepad.Domain.Models
{
    public class Wine : IEntity
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Region { get; set; }
        public int Year { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public Country Country { get; set; }
        public Type Type { get; set; }
    }
}