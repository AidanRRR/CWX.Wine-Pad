using System.Collections.Generic;

namespace Cwx.Winepad.Models
{
    public class Card
    {
        public int Id { get; }
        public Restaurant Restaurant { get; set; }
        public List<Wine> Wines { get; set; }
       
    }
}