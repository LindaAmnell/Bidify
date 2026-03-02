using Bidify.API.Core.Interfaces;
using Bidify.API.Data.Entities;
using Bidify.API.Data.Interfaces;
using Bidify.API.Dtos;

namespace Bidify.API.Core.Services
{
    public class UserService :IUserService
    {

        private readonly IUserRepo _userRepo;

        public UserService(IUserRepo userRepo)
        {
            _userRepo = userRepo;
        }
        public async Task<List<UserDto>> GetAllAsync()
        {
            return await _userRepo.GetAllAsync();
        }
        public async Task<User?> GetByIdAsync(int userId)
        {
            return await _userRepo.GetByIdAsync(userId);
        }

        public async Task DeactivateAsync(int userId)
        {
            var user = await _userRepo.GetByIdAsync(userId);

            if (user == null)
                throw new InvalidOperationException("User not found");

            user.IsActive = false;

            _userRepo.Update(user);
            await _userRepo.SaveChangesAsync();
        }

        public async Task UpdatePasswordAsync(int userId, string newPassword)
        {
            var user = await _userRepo.GetByIdAsync(userId);

            if (user == null)
                throw new InvalidOperationException("User not found");

            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(newPassword);

            user.PasswordHash = hashedPassword;

            _userRepo.Update(user);
            await _userRepo.SaveChangesAsync();
        }


    }
}
