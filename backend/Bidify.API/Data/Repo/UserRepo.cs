using Bidify.API.Data.Entities;
using Bidify.API.Data.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Bidify.API.Data.Repo
{
    public class UserRepo : IUserRepo
    {

        private readonly BidifyDbContext _context;

        public UserRepo(BidifyDbContext context)
        {
            _context = context;
        }
        public async Task<User?> GetByIdAsync(int id)
        {
            return await _context.Users
                .Include(u => u.Auctions)
                .Include(u => u.Bids)
                .FirstOrDefaultAsync(u => u.UserId == id);
        }
        public async Task<User?> GetByUsernameAsync(string username)
        {
           return await _context.Users
                .FirstOrDefaultAsync(u => u.Username == username);
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            return await _context.Users
                 .FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<List<User>> GetAllAsync()
        {
            return await _context.Users.ToListAsync();
        }


        public async Task AddAsync(User user)
        {
            await _context.Users.AddAsync(user);
        }
        public void Update(User user)
        {
            _context.Users.Update(user);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }

    }
}
