using BYS_Web.Common;
using BYS_Web.Entity;
using BYSDN.Common;
using BYSDN.Lucene;
using BYSDN.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;

namespace BYS_Web.Controllers
{
    [NoCache]
    public class BlogController : Controller
    {
        //
        // GET: /Blog/
        BYSDNEntities entities = new BYSDNEntities();
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetBlogTypes()
        {
            var result = (from a in entities.Table_BlogItem
                          select a).AsEnumerable()
                         .Select(c => new
                         {
                             Id = c.ID,
                             Name = c.Name,
                             Description = c.Description
                         }).ToList();

            return Json(new { success = true, retData = result }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAttachments(string Id)
        {
            Guid ID = new Guid(Id);

            var result = (from a in entities.Table_BlogAttachments
                          where a.BlogID == ID
                          select new
                          {
                              ID = a.ID,
                              Name = a.FileName,
                              Size = a.FileSize
                          }).ToList();

            return Json(new { success = true, retData = result }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult DownloadFile(string Id)
        {
            Guid ID = new Guid(Id);

            var fileName = (from a in entities.Table_BlogAttachments
                            where a.ID == ID
                            select a.FileName).FirstOrDefault();

            var path = Path.Combine(Server.MapPath("~/Attachments/"), fileName);

            var outPutName = path.Split('%')[2];

            return File(path, MIMETypeHelper.GetMimeType(Path.GetExtension(path)), Server.UrlPathEncode(outPutName));
        }

        [HttpPost]
        public JsonResult SubmitReply(string id, string content) 
        {
            Table_User user = (from a in entities.Table_User
                                   where a.Name == Request.LogonUserIdentity.Name
                                   select a).FirstOrDefault();
            Table_BlogReply reply = new Table_BlogReply();
            if (user != null)
            {                
                reply.BlogID = new Guid(id);
                reply.Content = content;
                reply.Publisher = user.ID;
                reply.Date = DateTime.Now.ToUniversalTime();
                reply.ID = Guid.NewGuid();
                entities.Table_BlogReply.Add(reply);
                entities.SaveChanges();
            }

            return Json(new { success = true, retData = reply.ID }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetBlogReplys(Guid id, int Page) 
        {
            int offSet = (Page - 1) * 10;

            int i = 0,j = 0;

            List<BlogReplyModel> reply = new List<BlogReplyModel>();

            //var result = (from a in entities.Table_BlogReply
            //              where a.BlogID == id
            //              orderby a.Date ascending
            //              select a).Skip(offSet).Take(10).ToList();

            var result = (from a in entities.Table_BlogReply
                          where a.BlogID == id
                          orderby a.Date ascending
                          select a).ToList();

            foreach (var obj in result)
            {
                j = 1;
                BlogReplyModel re = new BlogReplyModel();
                re.Id = obj.ID;
                re.Order = offSet + i + 1;
                re.ReplyContent = obj.Content;
                re.UserEmail = obj.Table_User.Name + "@Microsoft.com";
                re.UserImg = obj.Table_User.Photo;
                re.UserName = obj.Table_User.Name;
                re.SubReply = obj.Table_SubBlogReply.AsEnumerable().OrderBy(c=>c.Date).Select(C=> new ReplyDetailsModel(){
                    Order = j++,
                    ReplyContent = C.Content,
                    UserEmail = C.Table_User.Name + "@Microsoft.com",
                    UserImg = C.Table_User.Photo,
                    UserName = C.Table_User.Name
                }).ToList();

                reply.Add(re);
                i++;
            }

            return Json(new { success = true, retData = reply }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SubmitOtherReply(string ReplyId, string content)
        {
            Table_User user = (from a in entities.Table_User
                               where a.Name == Request.LogonUserIdentity.Name
                               select a).FirstOrDefault();
            Table_SubBlogReply reply = new Table_SubBlogReply();
            if (user != null)
            {
                reply.ReplyID = new Guid(ReplyId);
                reply.Content = content;
                reply.Publisher = user.ID;
                reply.Date = DateTime.Now.ToUniversalTime();
                reply.ID = Guid.NewGuid();
                entities.Table_SubBlogReply.Add(reply);
                entities.SaveChanges();
            }
            return Json(new { success = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult RequestPublish()
        {
            string title, blogId, content;

            title = Request.Params["title"];
            blogId = Request.Params["blogId"];
            content = htmlDeCode(Request.Params["blogContent"]);
            List<AttachmentModel> attachments = null;

            if (Request.Params["attachments"] != null)
            {
                attachments = JsonConvert.DeserializeObject<List<AttachmentModel>>(Request.Params["attachments"]);
            }
            else
            {
                attachments = new List<AttachmentModel>();
            }

            try
            {
                Table_User user = (from a in entities.Table_User
                                   where a.Name == Request.LogonUserIdentity.Name
                                   select a).FirstOrDefault();
                if (user != null)
                {
                    Table_Blog newQuestion = new Table_Blog();
                    newQuestion.ID = Guid.NewGuid();
                    newQuestion.Content = content;
                    newQuestion.Date = DateTime.Now.ToUniversalTime();
                    newQuestion.Publisher = user.ID;
                    newQuestion.BlogItemId = new Guid(blogId);
                    newQuestion.Title = title;
                    newQuestion.Status = 1;

                    entities.Table_Blog.Add(newQuestion);
                    List<Table_BlogAttachments> files = new List<Table_BlogAttachments>();
                    foreach (var obj in attachments)
                    {
                        files.Add(new Table_BlogAttachments()
                        {
                            ID = Guid.NewGuid(),
                            BlogID = newQuestion.ID,
                            FileName = obj.FileName,
                            FileSize = obj.FileSize,
                        });
                    }

                    entities.Table_BlogAttachments.AddRange(files);

                    entities.SaveChanges();

                    //Lucener lucener = new Lucener();
                    //lucener.AddData(newQuestion.ID.ToString(), newQuestion.Content,"", newQuestion.Title, "Blog");

                    return Json(new { success = true, retData = newQuestion.ID }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { success = true, retData = "The user is not registe" }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (DbEntityValidationException e)
            {
                return Json(new { success = false, retData = e.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetItemsCount(Guid itemId)
        {
            var result = (from a in entities.Table_Blog
                          where a.BlogItemId == itemId && a.Status > 0
                          select a.ID).Count();
            return Json(new { success = true, retData = result }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetItems(Guid itemId, int page)
        {
            int start = (page - 1) * 10;

            var result = (from a in entities.Table_Blog
                          where a.BlogItemId == itemId && a.Status > 0
                          orderby a.Date descending
                          select a)
                            .Skip(start)
                            .Take(10)
                            .AsEnumerable()
                            .Select(c =>
                            new 
                            {
                                BlogId = c.ID.ToString(),
                                PublishDate = GetStringData(c.Date),
                                Title = c.Title,
                                UserName = GetUserName(c.Table_User.Name),
                                UserImage = c.Table_User.Photo,
                            }).ToList(); ;
            return Json(new { success = true, retData = result }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetBlogContent(Guid blogId)
        {
            var result = (from a in entities.Table_Blog
                          where a.ID == blogId
                          select a)
                          .AsEnumerable()
                          .Select(c =>
                           new
                          {
                              Title = c.Title,
                              Content = c.Content,
                              Date = GetStringData(c.Date),
                              PublisherEmail = GetEmail(c.Table_User.Name),
                              PublisherImg = "../" + c.Table_User.Photo,
                              PublisherName = c.Table_User.Name
                          }).First();
            return Json(new { success = true, retData = result }, JsonRequestBehavior.AllowGet);
        }

        private string GetStringData(DateTime dt)
        {
            var span = DateTime.Now.ToUniversalTime() - dt;
            if (span.TotalDays > 60)
            {
                return "long time ago";
            }
            else
            {
                if (span.TotalDays > 30)
                {
                    return "1 Months ago";
                }
                else
                {
                    if (span.TotalDays > 14)
                    {
                        return "2 weeks ago";
                    }
                    else
                    {
                        if (span.TotalDays > 7)
                        {
                            return "1 weeks ago";
                        }
                        else
                        {
                            if (span.TotalDays > 1)
                            {
                                return string.Format("{0} days ago", (int)Math.Floor(span.TotalDays));
                            }
                            else
                            {
                                if (span.TotalHours > 1)
                                {
                                    return string.Format("{0} hours ago", (int)Math.Floor(span.TotalHours));
                                }
                                else
                                {
                                    if (span.TotalMinutes > 1)
                                    {
                                        return string.Format("{0} minutes ago", (int)Math.Floor(span.TotalMinutes));
                                    }
                                    else
                                    {
                                        if (span.TotalSeconds >= 1)
                                        {
                                            return string.Format("{0} second ago", (int)Math.Floor(span.TotalSeconds));
                                        }
                                        else
                                        {
                                            return "just now";
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        private string GetEmail(string userName)
        {
            string result = string.Empty;
            for (int i = userName.Length - 1; i >= 0; i--)
            {
                if (userName[i] != '\\')
                {
                    result = userName[i] + result;
                }
                else
                {
                    break;
                }
            }
            return result + "@Microsoft.com";
        }

        private string htmlDeCode(string inputs)
        {
            if (inputs.Length == 0)
                return string.Empty;

            string result = string.Empty;
            result = inputs.Replace("&namp;", "&");
            result = result.Replace("&nlt;", "<");
            result = result.Replace("&ngt;", ">");
            result = result.Replace("&nquot;", "\"");

            return result;
        }
        private string GetUserName(string userName)
        {
            string result = string.Empty;
            for (int i = userName.Length - 1; i >= 0; i--)
            {
                if (userName[i] != '\\')
                {
                    result = userName[i] + result;
                }
                else
                {
                    break;
                }
            }
            return result;
        }
    }
}
