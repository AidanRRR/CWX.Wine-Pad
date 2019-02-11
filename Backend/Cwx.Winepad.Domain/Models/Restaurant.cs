using Cwx.Winepad.Infrastructure.Entities;

namespace Cwx.Winepad.Domain.Models
{
    public class Restaurant : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string VatNumber { get; set; }
        public Address Address { get; set; }
        public Card Card { get; set; }
    }
}