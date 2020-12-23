using System;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using static API.Entities.Offer;

namespace API.Data
{
    public class DataContext : IdentityDbContext<User, Role, int, 
        IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>, 
        IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions options) : base(options){}
        public DbSet<Offer> Offers { get; set; }
        public DbSet<Photo> Photo { get; set; }
        
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
        }
    }
}