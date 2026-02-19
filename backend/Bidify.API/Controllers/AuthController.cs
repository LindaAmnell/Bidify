using Bidify.API.Core.Interfaces;
using Bidify.API.Data.Interfaces;
using Bidify.API.Dtos.UserDto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Bidify.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IUserRepo _userRepo;


        public AuthController(IAuthService authService, IUserRepo userRepo)
        {
            _authService = authService;
            _userRepo = userRepo;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            try
            {
                var token = await _authService.RegisterAsync(dto.Username, dto.Email, dto.Password);

                var user = await _userRepo.GetByUsernameAsync(dto.Username);

                return Ok(new
                {
                    token,
                    user = new
                    {
                        userId = user.UserId,
                        username = user.Username
                    }
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            try
            {
                var user = await _userRepo.GetByUsernameAsync(dto.Username);
                if (user == null)
                    return Unauthorized("Invalid credentials");

                var token = await _authService.LoginAsync(dto.Username, dto.Password);

                return Ok(new
                {
                    token,
                    user = new
                    {
                        userId = user.UserId,
                        username = user.Username
                    }
                });
            }
            catch (Exception ex)
            {
                return Unauthorized(ex.Message);
            }
        }


    }
}
