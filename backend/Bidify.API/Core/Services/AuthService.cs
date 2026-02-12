using Bidify.API.Core.Enum;
using Bidify.API.Core.Interfaces;
using Bidify.API.Data.Entities;
using Bidify.API.Data.Interfaces;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Bidify.API.Core.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepo _userRepo;
        private readonly IConfiguration _configuration;

        public AuthService(IUserRepo userRepo, IConfiguration configuration)
        {
            _userRepo = userRepo;
            _configuration = configuration;
        }
        public async Task<string> RegisterAsync(string username, string email, string password)
        {
            var existingUser = await _userRepo.GetByUsernameAsync(username);
            if (existingUser != null)
                throw new InvalidOperationException("Username already exists");

            var existingEmail = await _userRepo.GetByEmailAsync(email);
            if (existingEmail != null)
                throw new InvalidOperationException("Email already exists");

            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(password);

            var user = new User
            {
                Username = username,
                Email = email,
                PasswordHash = hashedPassword,
                Role = UserRole.User,
                IsActive = true
            };

            await _userRepo.AddAsync(user);
            await _userRepo.SaveChangesAsync();

            return GenerateToken(user);
        }

        public async Task<string> LoginAsync(string username, string password)
        {
            var user = await _userRepo.GetByUsernameAsync(username);

            if (user == null)
                throw new InvalidOperationException("Invalid credentials");

            if (!user.IsActive)
                throw new InvalidOperationException("Account is deactivated");

            var validPassword = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);

            if (!validPassword)
                throw new InvalidOperationException("Invalid credentials");

            return GenerateToken(user);
        }

        private string GenerateToken(User user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.Role.ToString())
            };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_configuration["Jwt:Key"])
            );

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(
                    Convert.ToDouble(_configuration["Jwt:DurationInMinutes"])
                ),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
