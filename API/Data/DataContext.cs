using System;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using static API.Entities.Offer;
using static API.Entities.Work;

namespace API.Data
{
    public class DataContext : IdentityDbContext<User, Role, int, 
        IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>, 
        IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions options) : base(options){}
        public DbSet<Offer> Offers { get; set; }
        public DbSet<Photo> Photo { get; set; }
        public DbSet<Work> Works { get; set; }
        public DbSet<WorkTask> WorkTasks { get; set; }
        
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<User>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.User)
                .HasForeignKey(ur => ur.UserId)
                .IsRequired();
            
            builder.Entity<Role>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.Role)
                .HasForeignKey(ur => ur.RoleId)
                .IsRequired();
            
            builder.Entity<Offer>()
                .Property(e => e.OfferCategoryName)
                .HasConversion(
                    v => v.ToString(),
                    v => (OfferCategory)Enum.Parse(typeof(OfferCategory), v));
            
            builder.Entity<Work>()
                .Property(w => w.WorkStatusName)
                .HasConversion(
                    v => v.ToString(),
                    v => (WorkStatus)Enum.Parse(typeof(WorkStatus), v));
        }
    }
}