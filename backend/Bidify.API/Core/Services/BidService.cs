using Bidify.API.Data.Entities;
using Bidify.API.Data.Interfaces;

namespace Bidify.API.Core.Services
{
    public class BidService
    {
        private readonly IBidRepo _bidRepo;
        private readonly IAuctionRepo _auctionRepo;

        public BidService(IBidRepo bidRepo, IAuctionRepo auctionRepo)
        {
            _bidRepo = bidRepo;
            _auctionRepo = auctionRepo;
        }

        public async Task<Bid> PlaceBidAsync(int auctionId, int userId, decimal bidAmount)
        {
            var auction = await _auctionRepo.GetByIdAsync(auctionId);

            if (auction == null)
                throw new InvalidOperationException("Auction not found");

            if (!auction.IsActive || auction.EndDate <= DateTime.UtcNow)
                throw new InvalidOperationException("Auction is closed");

            if (auction.UserId == userId)
                throw new InvalidOperationException("Owner cannot place bids");

            var bids = await _bidRepo.GetByAuctionIdAsync(auctionId);

            var highestBid = bids.Any()
                ? bids.Max(b => b.BidAmount)
                : auction.StartPrice;

            if (bidAmount <= highestBid)
                throw new InvalidOperationException("Bid must be higher than current highest bid");

            var bid = new Bid
            {
                AuctionId = auctionId,
                UserId = userId,
                BidAmount = bidAmount,
                BidDate = DateTime.UtcNow
            };

            await _bidRepo.AddAsync(bid);
            await _bidRepo.SaveChangesAsync();

            return bid;
        }

        public async Task DeleteAsync(int bidId, int userId)
        {
            var bid = await _bidRepo.GetByIdAsync(bidId);

            if (bid == null)
                throw new InvalidOperationException("Bid not found");

            if (bid.UserId != userId)
                throw new UnauthorizedAccessException("Not allowed");

            if (bid.Auction.EndDate <= DateTime.UtcNow)
                throw new InvalidOperationException("Auction is closed");

            _bidRepo.Delete(bid);
            await _bidRepo.SaveChangesAsync();
        }
    }

}

