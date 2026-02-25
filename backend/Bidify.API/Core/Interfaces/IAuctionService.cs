using Bidify.API.Data.Entities;
using Bidify.API.Dtos.ActionDto;

namespace Bidify.API.Core.Interfaces
{
    public interface IAuctionService
    {
        Task<Auction> CreateAsync(Auction auction);

        Task<List<Auction>> GetAllAsync();         
        Task<List<Auction>> GetAllOpenAsync();
        Task<List<Auction>> GetAllClosedAsync();

        Task<AuctionDto?> GetByIdAsync(int auctionId);

        Task DeactivateAsync(int auctionId, int userId);
        Task UpdateOwnAuctionAsync(int auctionId, int userId, Auction updatedAuction);
    }
}
