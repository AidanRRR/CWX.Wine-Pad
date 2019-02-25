using System.Collections.Generic;

namespace Cwx.Winepad.Domain.Models
{
    public class Admin : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<CardAdmin> CardAdmins { get; set; }
    }
}