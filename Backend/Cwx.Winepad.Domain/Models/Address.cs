using Cwx.Winepad.Infrastructure.Entities;

namespace Cwx.Winepad.Domain.Models
{
    public class Address : IEntity
    {
        public int Id { get; set; }
        public string Street { get; set; }
        public string Number { get; set; }
        public string BusNumber { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
        public Country Country { get; set; }
    }
}