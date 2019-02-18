using Microsoft.EntityFrameworkCore;
using System.Data.Common;
using Cwx.Winepad.Domain.Models;

namespace Cwx.Winepad.Data.DAL
{
    public class WinePadContext : DbContext
    {
        //DbContext MOET een instantie hebben van DbCOntextOptions om te kunnen werken. 
        //Die opties steken in de Startup.cs
        public WinePadContext(DbContextOptions<WinePadContext> options) : base(options)
        {
            
        }
    
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
           
        }

        public DbSet<Wine> Wine { get; set; }
        public DbSet<Card> Card { get; set; }
        public DbSet<Admin> Admin { get; set; }
        public DbSet<Country> Country { get; set; }
        public DbSet<Measure> Measure { get; set; }
        public DbSet<Region> Region { get; set; }
        public DbSet<Segment> Segment { get; set; }
        public DbSet<WineType> WineType { get; set; }
        public DbSet<CardAdmin> CardAdmin { get; set; }
        public DbSet<SegmentWine> SegmentWine { get; set; }
        
    }
}