using Cwx.Winepad.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Cwx.Winepad.Infrastructure.Context
{
    public class WinePadContext : DbContext
    {
        public WinePadContext(DbContextOptions<WinePadContext> options) : base(options) { }
    
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Wine>()
                .HasMany(w => w.Measures)
                .WithOne(m => m.Wine)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Wine>()
                .HasOne(w => w.Region)
                .WithMany(r => r.Wines)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Region>()
                .HasMany(r => r.Wines)
                .WithOne(w => w.Region);

            modelBuilder.Entity<Region>()
                .HasOne(r => r.Country)
                .WithMany(c => c.Regions);
                
            modelBuilder.Entity<Segment>()
                .HasOne(s => s.Card)
                .WithMany(c => c.Segments)
                .OnDelete(DeleteBehavior.Cascade);

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

            modelBuilder.Entity<Country>();
        }

    }
}