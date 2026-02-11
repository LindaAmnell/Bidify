using Bidify.API.Data.Entities;

namespace Bidify.API.Data.Interfaces
{
    public interface IBidRepo
    {

        Task<Bid?> GetByIdAsync(int id);
        Task<List<Bid>> GetByAuctionIdAsync(int auctionId);
        Task AddAsync(Bid bid);
        void Delete(Bid bid);
        Task SaveChangesAsync();

    }
}
