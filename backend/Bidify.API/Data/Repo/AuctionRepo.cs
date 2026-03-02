using Bidify.API.Data.Entities;
using Bidify.API.Data.Interfaces;
using Bidify.API.Dtos;
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
                    .ThenInclude(b => b.User)
                .FirstOrDefaultAsync(a => a.AuctionId == id);
        }
        public async Task<List<AuctionDto>> GetAllAsync()
        {
            return await _context.Auctions
                .Select(a => new AuctionDto
                {
                    AuctionId = a.AuctionId,
                    Title = a.Title,
                    Description = a.Description,
                    ImageUrl = a.ImageUrl,
                    StartPrice = a.StartPrice,

                    HighestBid = a.Bids.Any()
                        ? a.Bids.Max(b => b.BidAmount)
                        : a.StartPrice,

                    StartDate = a.StartDate,
                    EndDate = a.EndDate,
                    IsActive = a.IsActive,
                    UserId = a.UserId,


                    OwnerName = a.User!.Username
                })
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
                .Include(a => a.Bids)
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
