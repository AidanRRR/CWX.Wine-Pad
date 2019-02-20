using System.Collections.Generic;
using Cwx.Winepad.Infrastructure.Entities;

namespace Cwx.Winepad.Domain.Models
{
    public class Admin : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<CardAdmin> CardAdmins { get; set; }
    }
}