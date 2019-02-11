﻿using System.Collections.Generic;
using Cwx.Winepad.Infrastructure.Entities;

namespace Cwx.Winepad.Domain.Models
{
    public class Card : IEntity
    {
        public int Id { get; set; }
        public Restaurant Restaurant { get; set; }
        public List<Wine> Wines { get; set; }
    }
}