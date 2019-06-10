using CropImage.DB;
using CropImage.Base;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq; 
using System.Web.Mvc; 

namespace CropImage.Controllers.Admin
{
    [RouteArea("admin")]
    [RoutePrefix("ajax")]

    public partial class AdminProcessController : Controller
    {
        [Route("AddProductGallery")]
        [HttpPost]
        public JsonResult AddProductGallery()
        {
            var _result = new Result();
           
            try
            {
                var LogoImgPath = new List<string>();

                if (System.Web.HttpContext.Current.Request.Files.AllKeys.Any())
                {
                    var keys = System.Web.HttpContext.Current.Request.Files.AllKeys;
                    foreach (var key in keys)
                    {
                        var pic = System.Web.HttpContext.Current.Request.Files[key];

                        var _fileName = Functions.PhotoTitle(pic.FileName.Split('.')[0]); 
                        var _fileExtension = Path.GetExtension(pic.FileName);

                        var images = _fileName +   _fileExtension;
                        var img = Image.FromStream(pic.InputStream);

                        string path = Path.Combine(System.Web.HttpContext.Current.Server.MapPath(@"/UploadFile/Galeri"), images);
                        Functions.CropImage(img, path, 2000, 1100, false, 1);   // give the image width and height
                        //last parameter cases
                        /// 1- only resize width/height ratio
                        /// 4- only resize transparent pictures by width/height ratio
                        // IF U WANNA CROP AND RESIZE THE PICTURE GIVE THE 3RD PARAMETER TRUE


                        GC.Collect();
                        LogoImgPath.Add(images);
                    }

                    //using (Entities db = new Entities())      need entity connection
                    //{

                    //    foreach (var item in LogoImgPath)
                    //    {
                    //        var newItem = new Gallery()
                    //        {
                    //            PhotoPath = item
                    //        };

                    //        db.Gallery.Add(newItem);
                    //    }

                    //    db.SaveChanges();

                    //    _result.Success = true;
                    //}
                }
                else
                {
                    _result.Success = false;
                    _result.Message = "Fotoğraf Seçiniz";
                }
            }
            catch (Exception)
            {
                _result.Success = false;
                _result.Message = "Bir Hata Oluştu.Lütfen Tekrar Deneyin";
            }

            return Json(_result);
        }
       
    }
}