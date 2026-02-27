using Bidify.API.Core.Interfaces;
using Bidify.API.Data.Entities;
using Bidify.API.Data.Interfaces;
using Bidify.API.Data.Repo;
using Bidify.API.Dtos;

namespace Bidify.API.Core.Services
{
    public class BidService : IBidService
    {
        private readonly IBidRepo _bidRepo;
        private readonly IAuctionRepo _auctionRepo;
        private readonly IUserRepo _userRepo;

        public BidService(IBidRepo bidRepo, IAuctionRepo auctionRepo, IUserRepo userRepo)
        {
            _bidRepo = bidRepo;
            _auctionRepo = auctionRepo;
            _userRepo = userRepo;
        }
        public async Task<BidDto> PlaceBidAsync(int auctionId, int userId, decimal bidAmount)
        {
            var auction = await _auctionRepo.GetByIdAsync(auctionId);

            if (auction == null)
                throw new InvalidOperationException("Auction not found");

            if (!auction.IsActive || auction.EndDate <= DateTime.UtcNow)
                throw new InvalidOperationException("Auction is closed");

            if (auction.UserId == userId)
                throw new InvalidOperationException("Owner cannot place bids");

            var bids = await _bidRepo.GetByAuctionIdAsync(auctionId);

            var highestBidEntity = bids
                .OrderByDescending(b => b.BidAmount)
                .FirstOrDefault();

            var highestAmount = highestBidEntity?.BidAmount ?? auction.StartPrice;

            if (highestBidEntity?.UserId == userId)
                throw new InvalidOperationException("You already have the highest bid");

            if (bidAmount <= highestAmount)
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

            var user = await _userRepo.GetByIdAsync(userId);

            return new BidDto
            {
                Id = bid.Id,
                BidAmount = bid.BidAmount,
                BidDate = bid.BidDate,
                UserId = bid.UserId,
                Username = user.Username
            };
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

