using Bidify.API.Data.Entities;
using Bidify.API.Dtos;

namespace Bidify.API.Data.Interfaces
{
    public interface IUserRepo
    {

        Task<User?> GetByIdAsync(int id);
        Task<User?> GetByUsernameAsync(string username);
        Task<User?> GetByEmailAsync(string email);
        Task<List<UserDto>> GetAllAsync();
        Task AddAsync(User user);
        void Update(User user);
        Task SaveChangesAsync();

    }
}
