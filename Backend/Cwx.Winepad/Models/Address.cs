namespace Cwx.Winepad.Models
{
    public class Address
    {
        public int Id { get; }
        public string Street { get; set; }
        public int Number { get; set; }
        public int BusNumber { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
        public Country Country { get; set; }
    }
}