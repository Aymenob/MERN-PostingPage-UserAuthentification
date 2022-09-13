var cloudinary = require('cloudinary').v2;
require("dotenv").config()

cloudinary.config({ 
    cloud_name: 'dotrkogsz', 
    api_key: '394362348492519', 
    api_secret: 'JtrMzmwyavh1mgQxTrqPOCoslr4',
    secure: true
  });
  module.exports=cloudinary