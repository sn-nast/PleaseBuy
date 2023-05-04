using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PleaseBuy.Areas.Identity.Data;
using PleaseBuy.Data;
using PleaseBuy.Models;
using System.Net;
//using System.Numerics;

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
        public IActionResult Index(string? OrderId)
        {
            var datas = _db.Orders.Find(OrderId);
            var depositor = _userManager.GetUserName(this.User);

            if (datas.Owner == depositor)
            {
                return RedirectToAction("Index", "Home", new { area = "" });
            }

            datas.Depositor = depositor;
            datas.Confirmed = true;

            _db.Orders.Update(datas);
            _db.SaveChanges();

            IEnumerable<Canteen> allData = _db.Canteens.Where(p => p.Name == datas.Canteen);
            IEnumerable<Cart> carts = _db.Carts.Where(p => p.CartId == OrderId);

            List<String> allRestaurants = (from data in allData select data.Restaurant).Distinct().ToList();

            ViewData["OrderId"] = OrderId;
            ViewData["allData"] = allData;
            ViewData["allRestaurants"] = allRestaurants;
            ViewData["Owner"] = datas.Owner;
            ViewData["Canteen"] = datas.Canteen;
            ViewData["Carts"] = carts;

            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Add(Cart obj)
        {
            IEnumerable<Cart> carts = _db.Carts.Where(m => m.CartId == obj.CartId);
            if (obj.Annotation == null) { obj.Annotation = ""; }

            foreach (var cart in carts) {
                if (cart.Menu == obj.Menu && cart.Annotation == obj.Annotation) {
                    var newCart = cart;
                    newCart.Amount += 1;
                    _db.Carts.Update(newCart);
                    _db.SaveChanges();

                    return RedirectToAction("Index", new { OrderId = obj.CartId });
                }
            }

            _db.Carts.Add(obj);
            _db.SaveChanges();

            return RedirectToAction("Index", new { OrderId = obj.CartId});
        }

        public IActionResult DeleteMenu(int? id)
        {
            var cart = _db.Carts.Find(id);
            if (cart != null) {
                if (cart.Amount > 1) {
                    var newCart = cart;
                    newCart.Amount -= 1;
                    _db.Carts.Update(newCart);
                    _db.SaveChanges();

                    return RedirectToAction("Index", new { OrderId = cart.CartId });
                }
            }
            _db.Carts.Remove(cart);
            _db.SaveChanges();

            return RedirectToAction("Index", new { OrderId = cart.CartId });
        }
    }
}
