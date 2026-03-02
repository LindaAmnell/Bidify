using Bidify.API.Core.Interfaces;
using Bidify.API.Data.Entities;
using Bidify.API.Data.Interfaces;
using Bidify.API.Data.Repo;
using Bidify.API.Dtos;

using Microsoft.EntityFrameworkCore;

namespace Bidify.API.Core.Services
{
    public class AuctionService : IAuctionService
    {
        private readonly IAuctionRepo _auctionRepo;
        private readonly IUserRepo _userRepo;


        public AuctionService(IAuctionRepo auctionRepo, IUserRepo userRepo)
        {
            _auctionRepo = auctionRepo;
            _userRepo = userRepo;
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

        public async Task DeactivateAsync(int auctionId)
        {
            var auction = await _auctionRepo.GetByIdAsync(auctionId);

            if (auction == null)
                throw new InvalidOperationException("Auction not found");

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

        public async Task<AuctionDto?> GetByIdAsync(int auctionId)
        {
            var auction = await _auctionRepo.GetByIdAsync(auctionId);

            if (auction == null) return null;

            return new AuctionDto
            {
                AuctionId = auction.AuctionId,
                Title = auction.Title,
                Description = auction.Description,
                ImageUrl = auction.ImageUrl,
                StartPrice = auction.StartPrice,

                HighestBid = auction.Bids.Any()
                    ? auction.Bids.Max(b => b.BidAmount)
                    : auction.StartPrice,

                StartDate = auction.StartDate,
                EndDate = auction.EndDate,
                IsActive = auction.IsActive,
                UserId = auction.UserId,

                OwnerName = auction.User.Username,

                Bids = auction.Bids
                    .OrderByDescending(b => b.BidAmount)
                    .Select(b => new BidDto
                    {
                        Id = b.Id,
                        BidAmount = b.BidAmount,
                        BidDate = b.BidDate,
                        UserId = b.UserId,
                        Username = b.User.Username
                    })
                    .ToList()
            };
        }
    }

}
