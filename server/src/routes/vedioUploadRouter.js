const express=require('express');
const upload = require('../../utils/multer');
const { UploadVedio } = require('../controllers/vedioUploadController');
const router=express.Router();

router.post('/',upload.single("file"),UploadVedio)


module.exports=router;