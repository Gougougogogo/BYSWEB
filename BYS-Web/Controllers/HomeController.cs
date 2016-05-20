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

        public JsonResult GetBrifData()
        {
            int userCount = (from a in entities.Table_User
                             select a.ID).Count();
            int blogCount = (from a in entities.Table_Blog
                             where a.Status > 0
                             select a.ID).Count();
            int questionCount = (from a in entities.Table_Question
                                 select a.ID).Count();
            int answerCount = (from a in entities.Table_Answer
                               select a.ID).Count();

            return Json(new { success = true,
                retData = new 
                {
                    UserCount = userCount, 
                    BlogCount = blogCount, 
                    QuestionCount = questionCount, 
                    AnswerCount = answerCount 
                } }, JsonRequestBehavior.AllowGet);
        }
    }
}
