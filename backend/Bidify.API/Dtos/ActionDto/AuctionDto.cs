namespace Bidify.API.Dtos.ActionDto
{
    public class AuctionDto
    {
        public int AuctionId { get; set; }
        public string Title { get; set; } = "";
        public string Description { get; set; } = "";
        public string ImageUrl { get; set; } = "";
        public decimal StartPrice { get; set; }
        public decimal HighestBid { get; set; }  
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsActive { get; set; }
        public int UserId { get; set; }
    }
}
