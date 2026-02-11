using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bidify.API.Data.Entities
{
    public class Bid
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal BidAmount { get; set; }

        [Required]
        public DateTime BidDate { get; set; } = DateTime.Now;

        [Required]
        public int AuctionId { get; set; }

        public Auction Auction { get; set; } = null!;

        [Required]
        public int UserId { get; set; }

        public User User { get; set; } = null!;
    }
}
