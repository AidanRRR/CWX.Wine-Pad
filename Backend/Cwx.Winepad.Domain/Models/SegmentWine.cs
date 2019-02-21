using Cwx.Winepad.Infrastructure.Entities;

namespace Cwx.Winepad.Domain.Models
{
    public class SegmentWine : IEntity
    {
        public int Id { get; set; }
        public Wine Wine { get; set; }
        public Segment Segment { get; set; }
    }
}