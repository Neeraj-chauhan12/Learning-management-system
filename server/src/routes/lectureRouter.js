const express= require("express")
const { AuthMiddleware } = require("../middlewares/AuthMiddleware")
const { CreateLecture, getCourseLecture, editLecture, removeLecture, getLectureById } = require("../controllers/LectureControllers")
const router=express.Router()

router.post('/:courseId/lecture',AuthMiddleware,CreateLecture)
router.get('/:courseId/lecture',AuthMiddleware,getCourseLecture)
router.put('/:courseId/lecture/:lectureId',AuthMiddleware,editLecture)
router.delete('/lecture/:lectureId',AuthMiddleware,removeLecture)
router.get('/lecture/:lectureId',AuthMiddleware,getLectureById)

module.exports=router