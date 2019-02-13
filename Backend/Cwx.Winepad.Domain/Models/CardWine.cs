using Cwx.Winepad.Infrastructure.Entities;

namespace Cwx.Winepad.Domain.Models
{
    public class CardWine : IEntity
    {
        public int Id { get; set; }
        public Card Card { get; set; }
        public Wine Wine { get; set; }
    }
}