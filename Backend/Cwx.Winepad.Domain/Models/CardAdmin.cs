using Cwx.Winepad.Infrastructure.Entities;

namespace Cwx.Winepad.Domain.Models
{
    public class CardAdmin : IEntity
    {
        public int Id { get; set; }
        public int CardId { get; set; }
        public Card Card { get; set; }
        public int AdminId { get; set; }
        public Admin Admin { get; set; }
    }
}