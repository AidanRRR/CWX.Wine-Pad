using System.Collections.Generic;

namespace Cwx.Winepad.Models
{
    public class Admin
    {
        public int id { get; }
        public string Name { get; set; }
        public List<Card> Card { get; set; }

    }
}