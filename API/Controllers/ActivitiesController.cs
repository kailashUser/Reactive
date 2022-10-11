using Persistence;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;
using Domain;
using Microsoft.EntityFrameworkCore;
using System;
using MediatR;
using application.Activities;
using System.Threading;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {

      
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            //return await _context.Activities.ToListAsync();
            return await Mediator.Send(new List.Query());   
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            // return await _context.Activities.FindAsync(id);
            return await Mediator.Send(new Details.Query{Id = id});
        }


        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            return Ok(await Mediator.Send(new Create.Command { Activity = activity }));
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.id = id;
            return Ok(await Mediator.Send(new Edit.Command { Activity = activity }));
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command { id = id }));
        }
    }
}