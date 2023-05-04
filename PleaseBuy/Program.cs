using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;
using PleaseBuy.Areas.Identity.Data;
using PleaseBuy.Data;
var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("PleaseBuyContextConnection") ?? throw new InvalidOperationException("Connection string 'PleaseBuyContextConnection' not found.");

builder.Services.AddDbContext<PleaseBuyContext>(options => options.UseSqlServer(connectionString));

builder.Services.AddDefaultIdentity<PleaseBuyUser>(options => options.SignIn.RequireConfirmedAccount = true).AddEntityFrameworkStores<PleaseBuyContext>();

// Add services to the container.

builder.Services.AddControllersWithViews();
builder.Services.AddRazorPages();
builder.Services.Configure<IdentityOptions>(options =>
{
    options.Password.RequireNonAlphanumeric = false;
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.MapRazorPages();
app.Run();
