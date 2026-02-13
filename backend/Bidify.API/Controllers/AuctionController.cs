using Bidify.API.Core.Interfaces;
using Bidify.API.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Bidify.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuctionController : ControllerBase
    {

        private readonly IAuctionService _auctionService;

        public AuctionController(IAuctionService auctionService)
        {
            _auctionService = auctionService;
        }

        [HttpGet("open")]
        public async Task<IActionResult> GetOpen()
        {
            var auctions = await _auctionService.GetAllOpenAsync();
            return Ok(auctions);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create(Auction auction)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            auction.UserId = userId;

            var created = await _auctionService.CreateAsync(auction);
            return Ok(created);
        }


        [Authorize]
        [HttpPut("{id}/deactivate")]
        public async Task<IActionResult> Deactivate(int id)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            await _auctionService.DeactivateAsync(id, userId);
            return NoContent();
        }

    }
}
