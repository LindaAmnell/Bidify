using Bidify.API.Core.Interfaces;
using Bidify.API.Data.Entities;
using Bidify.API.Dtos;
using Microsoft.AspNetCore.Authorization;
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

        // 🔹 GET ALL
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var auctions = await _auctionService.GetAllAsync();
            return Ok(auctions);
        }

        // 🔹 CREATE
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create(Auction auction)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            auction.UserId = userId;

            var created = await _auctionService.CreateAsync(auction);
            return Ok(created);
        }

        // 🔹 DEACTIVATE
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}/deactivate")]
        public async Task<IActionResult> Deactivate(int id)
        {
            await _auctionService.DeactivateAsync(id);
            return NoContent();
        }

        // 🔹 UPDATE OWN AUCTION
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Auction auction)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            await _auctionService.UpdateOwnAuctionAsync(id, userId, auction);

            return NoContent();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AuctionDto>> GetById(int id)
        {
            var auction = await _auctionService.GetByIdAsync(id);

            if (auction == null)
                return NotFound();

            return Ok(auction);
        }
    }
}
