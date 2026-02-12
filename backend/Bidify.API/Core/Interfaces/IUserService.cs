using Bidify.API.Data.Entities;

namespace Bidify.API.Core.Interfaces
{
    public interface IUserService
    {

        Task<List<User>> GetAllAsync();

        Task<User?> GetByIdAsync(int userId);

        Task DeactivateAsync(int userId);

    }
}
