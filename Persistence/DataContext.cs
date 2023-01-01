using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
         {   
            
         }
         //public DataContext(DbContextOptions<DbContext> options) : base(options) {}
        public DbSet<Activity> Activities { get; set; }
        public DbSet <ActivityAtendee> ActivityAttendees { get; set; }
    
        protected override void OnModelCreating(ModelBuilder builder)
        {
                base.OnModelCreating(builder);


builder.Entity<ActivityAtendee>(x => x.HasKey(aa => new { aa.AppUserID, aa.ActivityId }));
                builder.Entity<ActivityAtendee>()
                .HasOne(u => u.AppUser)
                .WithMany(u => u.Activities)
                .HasForeignKey(aa => aa.AppUserID);

            builder.Entity<ActivityAtendee>()
                .HasOne(u => u.Activity)
                .WithMany(u => u.Attendees)
                .HasForeignKey(aa => aa.ActivityId);
        }
    }
}