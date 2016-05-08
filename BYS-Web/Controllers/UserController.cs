using BYS_Web.Entity;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BYS_Web.Controllers
{
    public class UserController : Controller
    {
        BYSDNEntities entities = new BYSDNEntities();
        //
        // GET: /User/
        
        public ActionResult Registe()
        {
            ViewBag.Name = User.Identity.Name;

            return View();
        }

        public ActionResult Upload(HttpPostedFileBase file)
        {
            string fileName = string.Empty;
            if (file != null && file.ContentLength > 0)
            {
                fileName = DateTime.Now.Ticks + Path.GetExtension(file.FileName);
                var path = Path.Combine(Server.MapPath("~/Images/"), fileName);
                file.SaveAs(path);
                return Json(new { success = true, serverFileName = fileName }, JsonRequestBehavior.AllowGet);
            }
            return Json(new { success = false }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetUserInfo()
        {
            string userName = Request.LogonUserIdentity.Name;
            var result = (from a in entities.Table_User
                          where a.Name == userName
                          select a).FirstOrDefault();
            if (result != null)
            {
                return Json(new { userName = result.Name, userImg = result.Photo }, JsonRequestBehavior.AllowGet);
            }
            return Json(new { userName = "", userImg = "app/img/user/01.jpg" }, JsonRequestBehavior.AllowGet);  
        }

        [HttpPost]
        public JsonResult CropperImage(string url, float x, float y, float width, float height)
        {
            string fileName = DateTime.Now.Ticks + Path.GetExtension(Server.MapPath(url));
            Bitmap image = GetImageFromUrl(url);
            Bitmap newImage = CreateImage(image, (int)x, (int)y, (int)width, (int)height);
            image.Dispose();
            if (System.IO.File.Exists(Server.MapPath(url)))
            {
                System.IO.File.Delete(Server.MapPath(url));
                newImage.Save(Path.Combine(Server.MapPath("~/Images/"), fileName));
            }
            return Json(new { success = true, fileName = fileName }, JsonRequestBehavior.AllowGet);
        }

        private Bitmap GetImageFromUrl(string url)
        {
            var path = Server.MapPath(url);
            if (System.IO.File.Exists(path))
            {
                return Bitmap.FromFile(path) as Bitmap;
            }
            return null;
        }

        private Bitmap CreateImage(Bitmap original, int x, int y, int width, int height)
        {
            var img = new Bitmap(width, height);
            using (var g = Graphics.FromImage(img))
            {
                g.SmoothingMode = SmoothingMode.AntiAlias;
                g.InterpolationMode = InterpolationMode.HighQualityBicubic;
                g.DrawImage(original, new Rectangle(0, 0, width, height), x, y, width, height, GraphicsUnit.Pixel);
            }
            return img;
        }

        public JsonResult RegisteUser(string UserName, string Sex, string Comments, string imgPath)
        {
            Table_User user = new Table_User();
            user.ID = Guid.NewGuid();
            user.Name = UserName;
            user.Photo = imgPath;
            user.Rate = 0;
            user.Sexy = Sex == "Male" ? true : false;
            user.Comments = Comments;
            user.Date = DateTime.Now.ToUniversalTime();
            try
            {
                entities.Table_User.Add(user);
                entities.SaveChanges();
                return Json(new { success = true }, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(new { success = false }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
