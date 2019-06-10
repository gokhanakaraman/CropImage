using System; 
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Text.RegularExpressions;

namespace CropImage.Base
{
    public static class Functions
    {
        public static void CropImage(Image originalImage, string path, int _targetWidth, int _targetHeight, bool IsCrop, int imageType, Rectangle? destinationRectangle = null)
        {
            Bitmap _processedPhoto = null;
            Graphics grafik = null;

            int _lastWidth = 0, _lastHeight = 0;

            if (Array.IndexOf(originalImage.PropertyIdList, 274) > -1)
            {
                var orientation = (int)originalImage.GetPropertyItem(274).Value[0];
                switch (orientation)
                {
                    case 1:
                        // No rotation required.
                        break;
                    case 2:
                        originalImage.RotateFlip(RotateFlipType.RotateNoneFlipX);
                        break;
                    case 3:
                        originalImage.RotateFlip(RotateFlipType.Rotate180FlipNone);
                        break;
                    case 4:
                        originalImage.RotateFlip(RotateFlipType.Rotate180FlipX);
                        break;
                    case 5:
                        originalImage.RotateFlip(RotateFlipType.Rotate90FlipX);
                        break;
                    case 6:
                        originalImage.RotateFlip(RotateFlipType.Rotate90FlipNone);
                        break;
                    case 7:
                        originalImage.RotateFlip(RotateFlipType.Rotate270FlipX);
                        break;
                    case 8:
                        originalImage.RotateFlip(RotateFlipType.Rotate270FlipNone);
                        break;
                }
                // This EXIF data is now invalid and should be removed.
                originalImage.RemovePropertyItem(274);
            }

            try
            {
                if ((originalImage.Width < _targetWidth) && (originalImage.Height < _targetHeight))
                {
                    _processedPhoto = new Bitmap(originalImage.Width, originalImage.Height);
                    grafik = Graphics.FromImage(_processedPhoto);

                    grafik.SmoothingMode = SmoothingMode.HighQuality;
                    grafik.CompositingQuality = CompositingQuality.HighQuality;
                    grafik.InterpolationMode = InterpolationMode.Default;
                    grafik.PixelOffsetMode = PixelOffsetMode.HighQuality;

                    var codec = ImageCodecInfo.GetImageEncoders();
                    var eParams = new EncoderParameters(1);
                    eParams.Param[0] = new EncoderParameter(System.Drawing.Imaging.Encoder.Quality, 85L);

                    grafik.DrawImage(originalImage, 0, 0, originalImage.Width, originalImage.Height);

                    _processedPhoto.Save(path, codec[imageType], eParams);

                    GC.Collect();
                }
                else
                {
                    if (IsCrop != true)
                    {
                        float _OrjiRatio = (float)originalImage.Width / (float)originalImage.Height;

                        float _hedefRatio = (float)_targetWidth / (float)_targetHeight;

                        if (_OrjiRatio > _hedefRatio) //Widthe Göre
                        {
                            _lastWidth = _targetWidth;
                            _lastHeight = Convert.ToInt32(_targetWidth / _OrjiRatio);
                        }
                        else //heighte göre
                        {
                            _lastHeight = _targetHeight;
                            _lastWidth = Convert.ToInt32(_targetHeight * _OrjiRatio);
                        }

                        _processedPhoto = new Bitmap(_lastWidth, _lastHeight);
                        grafik = Graphics.FromImage(_processedPhoto);

                        grafik.SmoothingMode = SmoothingMode.HighQuality;
                        grafik.CompositingQuality = CompositingQuality.HighQuality;
                        grafik.InterpolationMode = InterpolationMode.Default;
                        grafik.PixelOffsetMode = PixelOffsetMode.HighQuality;

                        var codec = ImageCodecInfo.GetImageEncoders();
                        var eParams = new EncoderParameters(1);
                        eParams.Param[0] = new EncoderParameter(System.Drawing.Imaging.Encoder.Quality, 85L);

                        grafik.DrawImage(originalImage, 0, 0, _lastWidth, _lastHeight);

                        _processedPhoto.Save(path, codec[imageType], eParams);

                        GC.Collect();
                    }
                    else
                    {
                        float _OrjiRatio = (float)originalImage.Width / (float)originalImage.Height;

                        float _hedefRatio = (float)_targetWidth / (float)_targetHeight;

                        if (_hedefRatio < _OrjiRatio) // heighte göre
                        {
                            _lastHeight = _targetHeight;

                            _lastWidth = Convert.ToInt32(_targetHeight * _OrjiRatio);
                        }
                        else // widthe göre
                        {
                            _lastWidth = _targetWidth;

                            _lastHeight = Convert.ToInt32(_targetWidth / _OrjiRatio);
                        }

                        _processedPhoto = new Bitmap(_lastWidth, _lastHeight);
                        grafik = Graphics.FromImage(_processedPhoto);

                        grafik.SmoothingMode = SmoothingMode.HighQuality;
                        grafik.CompositingQuality = CompositingQuality.HighQuality;
                        grafik.InterpolationMode = InterpolationMode.Default;
                        grafik.PixelOffsetMode = PixelOffsetMode.HighQuality;

                        var codec = ImageCodecInfo.GetImageEncoders();
                        var eParams = new EncoderParameters(1);
                        eParams.Param[0] = new EncoderParameter(System.Drawing.Imaging.Encoder.Quality, 85L);

                        grafik.DrawImage(originalImage, 0, 0, _lastWidth, _lastHeight);

                        GC.Collect();

                        var _processedPhotoWidth = _processedPhoto.Width;

                        var _processedPhotoHeight = _processedPhoto.Height;

                        var _ortWidth = Convert.ToInt32((_processedPhoto.Width - _targetWidth) / 2);

                        var _ortHeight = Convert.ToInt32((_processedPhoto.Height - _targetHeight) / 2);

                        var sourceRectangle = new Rectangle(_ortWidth, _ortHeight, _targetWidth, _targetHeight);

                        if (destinationRectangle == null)
                        {
                            destinationRectangle = new Rectangle(Point.Empty, sourceRectangle.Size);
                        }

                        var croppedImage = new Bitmap(destinationRectangle.Value.Width, destinationRectangle.Value.Height);

                        using (var graphics = Graphics.FromImage(croppedImage))
                        {
                            graphics.DrawImage(_processedPhoto, destinationRectangle.Value, sourceRectangle, GraphicsUnit.Pixel);
                        }

                        croppedImage.Save(path, codec[imageType], eParams);

                        GC.Collect();
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public static string PhotoTitle(string Title)
        {
            try
            {
                Title = Regex.Replace(Title, @"[ ]{2,}", "-");
                Title = Regex.Replace(Title, @"(\|@|&|'|\(|\)|<|>|#|)", "").Replace("?", "").ToLower();

                Title = Title.Replace("ç", "c").Replace("ş", "s").Replace("ğ", "g").Replace("ı", "i").Replace("ö", "o")
                    .Replace("ü", "u").Replace(" ", "-");
            }
            catch (Exception)
            {
            }

            return Title;
        }
    }
}