using Bidify.API.Data.Entities;
using Bidify.API.Data.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Bidify.API.Data.Repo
{
    public class AuctionRepo : IAuctionRepo
    {

        private readonly BidifyDbContext _context;

        public AuctionRepo(BidifyDbContext context)
        {
            _context = context;
        }

        public async Task<Auction?> GetByIdAsync(int id)
        {
            return await _context.Auctions
                .Include(a => a.User)
                .Include(a => a.Bids)
                .FirstOrDefaultAsync(a => a.AuctionId == id);
        }
        public async Task<List<Auction>> GetAllAsync()
        {
            return await _context.Auctions
                .Include(a => a.User)
                .ToListAsync();
        }

        public async Task<List<Auction>> SearchAsync(string title)
        {
            return await _context.Auctions
                .Where(a => a.Title.Contains(title))
                .ToListAsync();
        }
        public async Task<List<Auction>> GetByUserIdAsync(int userId)
        {
            return await _context.Auctions
                .Where(a => a.UserId == userId)
                .ToListAsync();
        }

        public async Task AddAsync(Auction auction)
        {
            await _context.Auctions.AddAsync(auction);
        }


        public void Update(Auction auction)
        {
            _context.Auctions.Update(auction);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
