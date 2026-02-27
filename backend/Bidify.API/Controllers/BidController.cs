using Bidify.API.Core.Interfaces;
using Bidify.API.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Bidify.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BidController : ControllerBase
    {

        private readonly IBidService _bidService;

        public BidController(IBidService bidService)
        {
            _bidService = bidService;
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Place([FromBody] PlaceBidDto dto)
        {
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
                return Unauthorized();

            try
            {
                var userId = int.Parse(userIdClaim);

                var bid = await _bidService.PlaceBidAsync(
                    dto.AuctionId,
                    userId,
                    dto.BidAmount
                );

                return Ok(bid);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            await _bidService.DeleteAsync(id, userId);
            return NoContent();
        }

    }
}
