const express=require("express")
const { AuthMiddleware } = require("../middlewares/AuthMiddleware")
const { Create, getCourseByAdmin } = require("../controllers/courseControllers")
const router=express.Router()


router.post('/',AuthMiddleware,Create)
router.get('/get',AuthMiddleware,getCourseByAdmin)

module.exports=router