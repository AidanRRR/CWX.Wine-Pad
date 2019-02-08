using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cwx.Winepad.Models
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
