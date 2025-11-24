const express=require("express")
const { AuthMiddleware } = require("../middlewares/AuthMiddleware")
const { Create } = require("../controllers/courseControllers")
const router=express.Router()


router.post('/',AuthMiddleware,Create)

module.exports=router