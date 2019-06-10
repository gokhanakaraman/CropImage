using CropImage.DB; 
using System.Linq; 
using System.Web.Mvc; 

namespace CropImage.Controllers.Admin
{
    [RouteArea("admin")]

    public partial class AdminPageController : Controller
    { 
        [Route("")]
        public ActionResult Index()
        {
            var mdl = new Models.Admin.ViewModels.GalleryModel();

            //using (var db = new Entities())           need Entity connection 
            //{
            //    mdl.GalleryList = (from s in db.Gallery
            //                       select new Models.Admin.GeneralModels.GalleryModel
            //                       {
            //                           Id = s.id,
            //                           PhotoPath = s.PhotoPath,
            //                       }).ToList();
            //}

            return View(mdl);
        } 
    }
}