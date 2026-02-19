using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bidify.API.Data.Entities
{
    public class Auction
    {
        [Key]
        public int AuctionId { get; set; }
        [Required]
        [MaxLength(150)]
        public string Title { get; set; } = null!;

        [Required]
        [MaxLength(1000)]
        public string Description { get; set; } = null!;

        [Required]
        [MaxLength(500)]
        public string ImageUrl { get; set; } = null!;

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal StartPrice { get; set; }
        [Required]
        public DateTime StartDate { get; set; }
        [Required]
        public DateTime EndDate { get; set; }


        public bool IsActive { get; set; } = true;
        [Required]
        public int UserId { get; set; }

        public User? User { get; set; }

        public List<Bid> Bids { get; set; } = new();
    }
}
