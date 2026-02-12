using Bidify.API.Data.Entities;

namespace Bidify.API.Core.Interfaces
{
    public interface IBidService
    {

        Task<Bid> PlaceBidAsync(int auctionId, int userId, decimal bidAmount);

        Task DeleteAsync(int bidId, int userId);
    }
}
