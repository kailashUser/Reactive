using Microsoft.AspNetCore.Mvc;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class BaseApiController : ControllerBase
    {
        private IMediator _imediator;

        protected IMediator Mediator => _imediator ??= HttpContext.RequestServices.GetService<IMediator>();

    }
}