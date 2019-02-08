using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cwx.Winepad.Models
{
    public class Wine
    {
        public int Id { get; }
        public string Title { get; set; }
        public string Region { get; set; }
        public int Year { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public Country Country { get; set; }

    }
}
