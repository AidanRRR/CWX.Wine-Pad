using System.Collections.Generic;
using Cwx.Winepad.Infrastructure.Entities;

namespace Cwx.Winepad.Domain.Models
{
    public class Segment : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<Card> Cards { get; set; }
    }
}