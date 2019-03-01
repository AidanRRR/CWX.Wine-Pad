using System.Collections.Generic;
using System.Net.Mail;

namespace Cwx.Winepad.Domain.Models
{
    public class Admin : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string MailAddress { get; set; }
        public ICollection<CardAdmin> CardAdmins { get; set; }
    }
}