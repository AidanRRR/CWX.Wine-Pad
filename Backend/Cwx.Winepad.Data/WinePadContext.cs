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

        public DbSet<Wine> Wines { get; set; }
        public DbSet<Card> Cards { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<Measure> Measures { get; set; }
        public DbSet<Region> Regions { get; set; }
        public DbSet<Segment> Segments { get; set; }
        public DbSet<WineType> WineTypes { get; set; }
        public DbSet<CardAdmin> CardAdmins { get; set; }
        public DbSet<CardWine> CardWines { get; set; }
        
    }
}