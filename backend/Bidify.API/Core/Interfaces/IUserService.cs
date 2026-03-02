using Bidify.API.Data.Entities;
using Bidify.API.Dtos;

namespace Bidify.API.Core.Interfaces
{
    public interface IUserService
    {

        Task<List<UserDto>> GetAllAsync();

        Task<User?> GetByIdAsync(int userId);

        Task DeactivateAsync(int userId);

        Task UpdatePasswordAsync(int userId, string newPassword);

    }
}
