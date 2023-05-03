using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PleaseBuy.Areas.Identity.Data;
using PleaseBuy.Data;
using PleaseBuy.Models;
using System.Net;
using System.Numerics;

namespace PleaseBuy.Controllers
{
    public class OrderController : Controller
    {
        private readonly UserManager<PleaseBuyUser> _userManager;
        private readonly PleaseBuyContext _db;

        public OrderController(UserManager<PleaseBuyUser> userManager, PleaseBuyContext db)
        {
            _userManager = userManager;
            _db = db;
        }
        public IActionResult Index(Order obj)
        {
            ViewData["UserName"] = _userManager.GetUserName(this.User);

            if (obj.Owner == _userManager.GetUserName(this.User)) {
                return RedirectToAction("Index", "Home", new { area = "" });
            }

            IEnumerable<Order> newObj = _db.Orders.Where(o => o.OrderId == obj.OrderId);
            foreach (var ob in newObj)
            {
                if (ob == null)
                {
                    Console.Write("------------------Error-----------------");
                    return RedirectToAction("Error", "Home", new { area = "" });
                }
                ob.Confirmed = true;
                ob.Depositor = obj.Depositor;

                if (!ModelState.IsValid)
                {
                    _db.Orders.Update(ob);
                    _db.SaveChanges();
                }
            }

            var canteen = "";
            ViewData["OrderId"] = obj.OrderId;
            ViewData["Owner"] = obj.Owner;

            try
            {
                ViewData["OrderId"] = Request.Query["OrderId"];
                canteen = Request.Query["Canteen"];
            }
            catch (Exception) {
                ViewData["OrderId"] = "";
                canteen = "";
            }

            IEnumerable<Canteen> allData = _db.Canteens.Where(p => p.Name == canteen);
            IEnumerable<Cart> carts = _db.Carts.Where(p => p.CartId == obj.OrderId);

            List<String> allRestaurants = (from data in allData select data.Restaurant).Distinct().ToList();
            
            ViewData["allData"] = allData;
            ViewData["allRestaurants"] = allRestaurants;
            ViewData["Canteen"] = canteen;
            ViewData["Carts"] = carts;


            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Update(String? OrderId)
        {
            var newObj = _db.Orders.Find(OrderId);
            if (newObj != null) { return NotFound(); }

            newObj.Confirmed = true;

            if (!ModelState.IsValid)
            {
                _db.Orders.Update(newObj);
                _db.SaveChanges();
                RedirectToAction("Index");
            }

            return View(newObj);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Add(Cart obj)
        {
            var username = _userManager.GetUserName(this.User);

            if (obj.Annotation == null) { obj.Annotation = ""; }

            _db.Carts.Add(obj);
            _db.SaveChanges();

            return RedirectToAction("Index", new {OrderId=obj.CartId, Owner=obj.Owner, Depositor=username, Canteen=obj.Canteen});
        }
    }
}
