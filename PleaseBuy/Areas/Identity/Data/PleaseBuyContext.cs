using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PleaseBuy.Areas.Identity.Data;
using PleaseBuy.Models;
using System.Reflection.Emit;

namespace PleaseBuy.Data {

    public class PleaseBuyContext : IdentityDbContext<PleaseBuyUser>
    {
        public PleaseBuyContext(DbContextOptions<PleaseBuyContext> options)
            : base(options)
        {
        }

        public DbSet<Canteen> Canteens { get; set; }

        public DbSet<Order> Orders { get; set; }

        public DbSet<Cart> Carts { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            
        }
    }
}