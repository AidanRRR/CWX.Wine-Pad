namespace Cwx.Winepad.Domain.Models
{
    public class Restaurant
    {
        public int Id { get; }
        public string Name { get; set; }
        public string VatNumber { get; set; }
        public Address Address { get; set; }
        public Card Card { get; set; }
    }
}