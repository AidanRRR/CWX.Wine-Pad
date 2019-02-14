using Cwx.Winepad.Infrastructure.Entities;

namespace Cwx.Winepad.Domain.Models
{
    public class WineType : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}