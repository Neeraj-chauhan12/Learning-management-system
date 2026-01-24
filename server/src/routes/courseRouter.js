const express=require("express")
const { AuthMiddleware } = require("../middlewares/AuthMiddleware")
const { Create, getCourseByAdmin, updateCourse, togglePublishCourse, getCourseById } = require("../controllers/courseControllers")
const upload=require("../../utils/multer")
const { CreateLecture, getCourseLecture, editLecture, removeLecture, getLectureById } = require("../controllers/LectureControllers")
const router=express.Router()


router.post('/',AuthMiddleware,Create)
router.get('/:courseId',AuthMiddleware,getCourseByAdmin)
router.put('/:courseId',AuthMiddleware,upload.single("courseThumbnail"),updateCourse)
router.post('/:courseId/lecture',AuthMiddleware,CreateLecture)
router.get('/:courseId/lecture',AuthMiddleware,getCourseLecture)
router.put('/:courseId/lecture/:lectureId',AuthMiddleware,editLecture)
router.delete('/lecture/:lectureId',AuthMiddleware,removeLecture)
router.get('/lecture/:lectureId',AuthMiddleware,getLectureById)
router.patch('/:courseId',AuthMiddleware,togglePublishCourse)
router.get('/course/:courseId',AuthMiddleware,getCourseById)

module.exports=router