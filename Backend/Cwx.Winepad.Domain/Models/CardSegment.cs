using Cwx.Winepad.Infrastructure.Entities;

namespace Cwx.Winepad.Domain.Models
{
    public class CardSegment : IEntity
    {
        public int Id { get; set; }
        public int CardId { get; set; }
        public Card Card { get; set; }
        public int SegmentId { get; set; }
        public Segment Segment { get; set; }
    }
}