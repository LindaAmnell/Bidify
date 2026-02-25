using Bidify.API.Core.Interfaces;
using Bidify.API.Data.Entities;
using Bidify.API.Data.Interfaces;

namespace Bidify.API.Core.Services
{
    public class AuctionService : IAuctionService
    {
        private readonly IAuctionRepo _auctionRepo;

        public AuctionService(IAuctionRepo auctionRepo)
        {
            _auctionRepo = auctionRepo;
        }

        public async Task<Auction> CreateAsync(Auction auction)
        {
         
            auction.StartDate = DateTime.UtcNow;
            auction.IsActive = true;
            auction.EndDate = auction.StartDate.AddDays(7);

            await _auctionRepo.AddAsync(auction);
            await _auctionRepo.SaveChangesAsync();

            return auction;
        }

        public async Task<List<Auction>> GetAllOpenAsync()
        {
            var auctions = await _auctionRepo.GetAllAsync();

            return auctions
                .Where(a => a.IsActive && a.EndDate > DateTime.UtcNow)
                .ToList();
        }

        public async Task DeactivateAsync(int auctionId, int userId)
        {
            var auction = await _auctionRepo.GetByIdAsync(auctionId);

            if (auction == null)
                throw new InvalidOperationException("Auction not found");

            
            if (auction.UserId != userId)
                throw new UnauthorizedAccessException("Not allowed");

            auction.IsActive = false;

            _auctionRepo.Update(auction);
            await _auctionRepo.SaveChangesAsync();
        }

        public async Task<List<Auction>> GetAllAsync()
        {
            return await _auctionRepo.GetAllAsync();
        }

        public async Task<List<Auction>> GetAllClosedAsync()
        {
            var auctions = await _auctionRepo.GetAllAsync();

            return auctions
                .Where(a => a.IsActive && a.EndDate <= DateTime.UtcNow)
                .ToList();
        }

        public async Task UpdateOwnAuctionAsync(int auctionId, int userId, Auction updatedAuction)
        {
            var auction = await _auctionRepo.GetByIdAsync(auctionId);

            if (auction == null)
                throw new InvalidOperationException("Auction not found");

            if (auction.UserId != userId)
                throw new UnauthorizedAccessException("Not allowed");

            auction.Title = updatedAuction.Title;
            auction.Description = updatedAuction.Description;
            auction.StartDate = updatedAuction.StartDate;
            auction.EndDate = updatedAuction.EndDate;
            auction.ImageUrl = updatedAuction.ImageUrl;

            if (!auction.Bids.Any())
            {
                auction.StartPrice = updatedAuction.StartPrice;
            }

            _auctionRepo.Update(auction);
            await _auctionRepo.SaveChangesAsync();
        }

    }

}
