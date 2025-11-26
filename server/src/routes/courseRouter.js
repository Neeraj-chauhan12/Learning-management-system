const express=require("express")
const { AuthMiddleware } = require("../middlewares/AuthMiddleware")
const { Create, getCourseByAdmin, updateCourse } = require("../controllers/courseControllers")
const upload=require("../../utils/multer")
const router=express.Router()


router.post('/',AuthMiddleware,Create)
router.get('/get',AuthMiddleware,getCourseByAdmin)
router.put('/:courseId',AuthMiddleware,upload.single("courseThumbnail"),updateCourse)

module.exports=router