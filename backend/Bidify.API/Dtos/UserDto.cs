namespace Bidify.API.Dtos
{
    public class UserDto
    {
        public int UserId { get; set; }
        public string Username { get; set; } = "";
        public bool IsActive { get; set; }
        public string Role { get; set; } = "";
    }
}
