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
            //Hier definieer je de relatie als volgt:
            //Measure heeft 1 wijn & de wijn kan meerdere measures hebben.
            //als je de wijn delete wordt de measure mee verwijdert.

            //.HasOne(m => m.Wine)
            //.WithMany(m => m.Measures)
            //.HasForeignKey(m => m.WineId)
            //.OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Wine>()
                .HasMany(w => w.Measures)
                .WithOne(m => m.Wine)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Wine>()
                .HasOne(w => w.Region)
                .WithMany(r => r.Wines);

            modelBuilder.Entity<Region>()
                .HasOne(r => r.Country)
                .WithMany(c => c.Regions);
            //modelBuilder.Entity<Wine>()
            //    .OwnsOne(w => w.Region)
            //    .HasMany(r => r.Wines)
            //    .WithOne(w => w.Region)
            //    .HasForeignKey("RegionId");

            //modelBuilder.Entity<Country>()
            //    .HasMany(c => c.Regions)
            //    .WithOne(r => r.Country)
            //    .OnDelete(DeleteBehavior.Cascade);

            //modelBuilder.Entity<Region>()
            //    .HasOne(r => r.Country)
            //    .WithMany(c => c.Regions);
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