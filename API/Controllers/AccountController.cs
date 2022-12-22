using Microsoft.AspNetCore.Mvc;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using API.DTOs;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using API.Services;


namespace API.Controllers
{
            [AllowAnonymous]
        [ApiController]
        [Route("api/[controller]")]

        public class AccountController : ControllerBase
        {
            private readonly  UserManager<AppUser> _userManager;
            private readonly  SignInManager<AppUser> _signInManager;
            private readonly TokenService _tokenService;
            public AccountController(UserManager<AppUser> userManager, 
                SignInManager<AppUser> signInManager, TokenService tokenservice)
            {
                _userManager = userManager;
                _signInManager = signInManager;
                _tokenService  =tokenservice;
            }



        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if (user == null) return Unauthorized();

            var results = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password,false);
            {
                if (results.Succeeded)
                {
                      return CreateUserObject(user);
                }
            }
            return Unauthorized();

        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
            {
                ModelState.AddModelError("email","Email Taken");
                return ValidationProblem();
            }
            if (await _userManager.Users.AnyAsync(x => x.UserName == registerDto.Username))
            {
                ModelState.AddModelError("userName","User Name Taken");
                return ValidationProblem();
            }
            var user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.Username,

            };
            var results = await _userManager.CreateAsync(user,registerDto.Password);
            if (results.Succeeded)
            {
                 return CreateUserObject(user);
            }

            return BadRequest("Problem when registering");
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

            return CreateUserObject(user);
        }

        private UserDto CreateUserObject(AppUser user)
        {
            return new UserDto
            {
                DisplayName = user.DisplayName,
                Image = null,
                Token = _tokenService.CreateToken(user),
                Username = user.UserName
            };
        }

    }

   
}