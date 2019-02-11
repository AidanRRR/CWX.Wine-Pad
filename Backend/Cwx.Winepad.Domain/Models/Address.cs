namespace Cwx.Winepad.Domain.Models
{
    public class Address
    {
        public int Id { get; }
        public string Street { get; set; }
        public string Number { get; set; }
        public string BusNumber { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
        public Country Country { get; set; }
    }
}