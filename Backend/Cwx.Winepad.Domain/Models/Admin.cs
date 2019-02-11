using System.Collections.Generic;

namespace Cwx.Winepad.Domain.Models
{
    public class Admin
    {
        public int Id { get; }
        public string Name { get; set; }
        public List<Card> Card { get; set; }
    }
}