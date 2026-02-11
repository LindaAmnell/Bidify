using Bidify.API.Core.Enum;
using System.ComponentModel.DataAnnotations;

namespace Bidify.API.Data.Entities
{
    public class User
    {
        [Key]
        public int UserId { get; set; }
        [Required]
        [MaxLength(80)]
        public string Username { get; set; } = null!;
        [Required]
        [MaxLength(150)]
        [EmailAddress]
        public string Email { get; set; } = null!;
        [Required]
        [MaxLength(255)]
        public string PasswordHash { get; set; } = null!;
        [Required]
        public UserRole Role { get; set; } = UserRole.User;
        public bool IsActive { get; set; } = true;

        public List<Auction> Auctions { get; set; } = new();
        public List<Bid> Bids { get; set; } = new();
    }
}
