namespace Bidify.API.Dtos
{
    public class BidDto
    {
        public int Id { get; set; }
        public decimal BidAmount { get; set; }
        public DateTime BidDate { get; set; }
        public int UserId { get; set; }
        public string? Username { get; set; }
    }
}
