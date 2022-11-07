using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using application.Result;


namespace application.Activities
{
    public  class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid id { get; set; }
        }

          public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.id);
                if(activity == null) return null;

                _context.Remove(activity);

                var result = await _context.SaveChangesAsync() > 0;
                if(!result) return Result<Unit>.Failure("Failed to Delete");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
