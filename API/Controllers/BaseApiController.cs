using Microsoft.AspNetCore.Mvc;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using application.Result;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class BaseApiController : ControllerBase
    {
        private IMediator _imediator;

        protected IMediator Mediator => _imediator ??= HttpContext.RequestServices.GetService<IMediator>();

        protected ActionResult HandleResult<T>(Result<T> result)
        {
            if(result == null) return NotFound();
               if (result.IsSuccess && result.Value != null)
            {
                return Ok(result.Value);
            }if(result.IsSuccess && result.Value == null){
                return NotFound();
            }return BadRequest(result.Error);
        }

    }
}