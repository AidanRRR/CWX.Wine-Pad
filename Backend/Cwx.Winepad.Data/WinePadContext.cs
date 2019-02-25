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
            //Measure wordt mee verwijdert als er een wijn wordt verwijdert.
            modelBuilder.Entity<Wine>()
                .HasMany(w => w.Measures)
                .WithOne(m => m.Wine)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Wine>()
                .HasOne(w => w.Region)
                .WithMany(r => r.Wines)
                .HasForeignKey("RegionId")
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Region>()
                .HasMany(r => r.Wines)
                .WithOne(w => w.Region);

            modelBuilder.Entity<Region>()
                .HasOne(r => r.Country)
                .WithMany(c => c.Regions);
                

           //Alle segmenten worden verwijdert bij het verwijderen van een "Card".     
            modelBuilder.Entity<Segment>()
                .HasOne(s => s.Card)
                .WithMany(c => c.Segments)
                .OnDelete(DeleteBehavior.Cascade);

            //Als je een segment verwijdert wordt de rij in SegmentWine ook verwijdert.
            modelBuilder.Entity<Segment>()
                .HasMany(s => s.SegmentWines)
                .WithOne(sg => sg.Segment)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<SegmentWine>()
                .HasOne(sw => sw.Segment)
                .WithMany(s => s.SegmentWines);
                
            modelBuilder.Entity<SegmentWine>()
                .HasOne(sw => sw.Wine)
                .WithMany(w => w.SegmentWines)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<CardAdmin>()
                .HasOne(ca => ca.Admin)
                .WithMany(a => a.CardAdmins)
                .OnDelete(DeleteBehavior.Cascade);
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