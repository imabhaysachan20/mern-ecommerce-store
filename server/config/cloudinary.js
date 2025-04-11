const cloudinary = require('cloudinary').v2;
const multer  = require('multer')
const storage = multer.memoryStorage()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

async function handleImageUpload(file) {
  const result = await cloudinary.uploader.upload(file,{
    resource_type:"auto"
  });
  return result;
}

const upload = multer({storage})


module.exports = {handleImageUpload,upload};