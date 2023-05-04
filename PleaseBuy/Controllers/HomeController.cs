using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using NuGet.DependencyResolver;
using PleaseBuy.Areas.Identity.Data;
using PleaseBuy.Data;
using PleaseBuy.Models;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Diagnostics;

namespace PleaseBuy.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        private readonly UserManager<PleaseBuyUser> _userManager;
        private readonly ILogger<HomeController> _logger;

        private readonly PleaseBuyContext _db;


        public HomeController(ILogger<HomeController> logger, UserManager<PleaseBuyUser> userManager, PleaseBuyContext db)
        {
            _logger = logger;
            _userManager = userManager;

            _db = db;
        }

        public IActionResult Index()
        {
            ReloadOrder();

            ViewData["UserId"] = _userManager.GetUserId(this.User);
            ViewData["UserName"] = _userManager.GetUserName(this.User);

            IEnumerable<Order> allOrders = _db.Orders;

            ViewData["allOrders"] = allOrders;


            IEnumerable<Cart> allCarts = _db.Carts;

            ViewData["allCarts"] = allCarts;

            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(Order obj)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<PleaseBuyUser> user = _db.Users.Where(x => x.Id == _userManager.GetUserId(this.User));

                var phoneNumber = "No Phone";
                foreach (var prop in user) { phoneNumber = prop.PhoneNumber; }

                DateTime today = DateTime.Now;

                obj.Time = today.AddMinutes(Int32.Parse(obj.TimeLimit));
                obj.Annotation = "";
                obj.Depositor = "";
                obj.PhoneNumber = phoneNumber;

                _db.Orders.Add(obj);
                _db.SaveChanges();

                return RedirectToAction("Index");
            }
            return View(obj);
        }

        public IActionResult ReloadOrder()
        {
            IEnumerable<Order> allOrders = _db.Orders;
            DateTime now = DateTime.Now;
            int test = 0;

            foreach (var order in allOrders)
            {
                if (!order.Confirmed)
                {
                    test = DateTime.Compare(order.Time, now);
                    if (test == -1)
                    {
                        _db.Orders.Remove(order);
                        _db.SaveChanges();
                    }
                }

            }

            return RedirectToAction("Index");
        }

        public IActionResult CompleteOrder(string? OrderId)
        {
            var orders = _db.Orders.Find(OrderId);

            if (orders != null)
            {
                _db.Orders.Remove(orders);
                _db.SaveChanges();
            }

            return RedirectToAction("Index");
        }


        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]

        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        public IActionResult CancelOrder(string? OrderId)
        {
            var Order = _db.Orders.Find(OrderId);

            if (Order != null)
            {
                var newOrder = Order;
                newOrder.Canceled = true;
                _db.Orders.Update(newOrder);
                _db.SaveChanges();
            }

            return RedirectToAction("Index");
        }
    }
}