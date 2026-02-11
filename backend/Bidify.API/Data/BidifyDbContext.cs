using Microsoft.EntityFrameworkCore;
using Bidify.API.Data.Entities;

namespace Bidify.API.Data
{
    public class BidifyDbContext : DbContext
    {
        public BidifyDbContext(DbContextOptions<BidifyDbContext> options)
            : base(options)
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Auction> Auctions { get; set; }
        public DbSet<Bid> Bids { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //  User → Auctions (1 to Many)
            modelBuilder.Entity<User>()
                .HasMany(u => u.Auctions)
                .WithOne(a => a.User)
                .HasForeignKey(a => a.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            //  User → Bids (1 to Many)
            modelBuilder.Entity<User>()
                .HasMany(u => u.Bids)
                .WithOne(b => b.User)
                .HasForeignKey(b => b.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            //  Auction → Bids (1 to Many)
            modelBuilder.Entity<Auction>()
                .HasMany(a => a.Bids)
                .WithOne(b => b.Auction)
                .HasForeignKey(b => b.AuctionId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
