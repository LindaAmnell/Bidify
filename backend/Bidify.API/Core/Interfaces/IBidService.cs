using Bidify.API.Data.Entities;
using Bidify.API.Dtos;

namespace Bidify.API.Core.Interfaces
{
    public interface IBidService
    {

            Task<BidDto> PlaceBidAsync(int auctionId, int userId, decimal bidAmount);
            Task DeleteAsync(int bidId, int userId);
        
    }
}
