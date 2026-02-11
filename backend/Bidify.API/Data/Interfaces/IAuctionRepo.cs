using Bidify.API.Data.Entities;

namespace Bidify.API.Data.Interfaces
{
    public interface IAuctionRepo
    {

        Task<Auction?> GetByIdAsync(int id);

        Task<List<Auction>> GetAllAsync();

        Task<List<Auction>> SearchAsync(string title);

        Task<List<Auction>> GetByUserIdAsync(int userId);

        Task AddAsync(Auction auction);

        void Update(Auction auction);

        Task SaveChangesAsync();
    }
}
