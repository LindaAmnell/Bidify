using Bidify.API.Core.Interfaces;
using Bidify.API.Data.Entities;
using Bidify.API.Dtos.ActionDto;
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

            var result = auctions.Select(a => new AuctionDto
            {
                AuctionId = a.AuctionId,
                Title = a.Title,
                Description = a.Description,
                ImageUrl = a.ImageUrl,
                StartPrice = a.StartPrice,
                HighestBid = a.Bids.Any()
                    ? a.Bids.Max(b => b.BidAmount)
                    : a.StartPrice,
                StartDate = a.StartDate,
                EndDate = a.EndDate,
                IsActive = a.IsActive,
                UserId = a.UserId
            });

            return Ok(result);
        }


        // 🔹 GET OPEN
        [HttpGet("open")]
        public async Task<IActionResult> GetOpen()
        {
            var auctions = await _auctionService.GetAllOpenAsync();
            return Ok(auctions);
        }

        // 🔹 GET CLOSED
        [HttpGet("closed")]
        public async Task<IActionResult> GetClosed()
        {
            var auctions = await _auctionService.GetAllClosedAsync();
            return Ok(auctions);
        }

        // 🔹 GET BY USER
        [Authorize]
        [HttpGet("my")]
        public async Task<IActionResult> GetMyAuctions()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            var auctions = await _auctionService.GetByUserAsync(userId);
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
