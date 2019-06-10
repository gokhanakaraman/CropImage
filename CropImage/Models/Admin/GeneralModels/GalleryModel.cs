using System; 

namespace CropImage.Models.Admin.GeneralModels
{
    public class GalleryModel
    {
        public int Id { get; set; }
        public string PhotoPath { get; set; }
        public string Title { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? OrderBy { get; set; }
    }
}