using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Domain;
using System;
using application.Activities;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {

      
      
        [HttpGet]       
        public async Task<IActionResult> GetActivities()
        {
            //return await Mediator.Send(new List.Query());
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetActivity(Guid id)
        {
                 
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        
        }


        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Activity = activity }));
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Activity = activity }));
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { id = id }));
        }
    }
}