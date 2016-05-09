using BYS_Web.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BYS_Web.Controllers
{
    public class HomeController : Controller
    {
        BYSDNEntities entities = new BYSDNEntities();
        //
        // GET: /Home/

        public ActionResult Index()
        {
            var person = (from a in entities.Table_User
                          where a.Name == Request.LogonUserIdentity.Name
                          select a.ID).FirstOrDefault();

            if (person == Guid.Empty)
            {
                return RedirectToAction("Registe", "User");
            }
            return View();
        }

    }
}
