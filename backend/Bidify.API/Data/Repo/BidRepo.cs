using Bidify.API.Data.Entities;
using Bidify.API.Data.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Bidify.API.Data.Repo
{
    public class BidRepo : IBidRepo
    {

        private readonly BidifyDbContext _context;

        public BidRepo(BidifyDbContext context)
        {
            _context = context;
        }

        public async Task<Bid?> GetByIdAsync(int id)
        {
            return await _context.Bids
                .Include(b => b.User)
                .Include(b => b.Auction)
                .FirstOrDefaultAsync(b => b.Id == id);
        }

        public async Task<List<Bid>> GetByAuctionIdAsync(int auctionId)
        {
            return await _context.Bids
                .Where(b => b.AuctionId == auctionId)
                .OrderByDescending(b => b.BidAmount)
                .ToListAsync();
        }

        public async Task AddAsync(Bid bid)
        {
            await _context.Bids.AddAsync(bid);
        }

        public void Delete(Bid bid)
        {
            _context.Bids.Remove(bid);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }


    }
}
