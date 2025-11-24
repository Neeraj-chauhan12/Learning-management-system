const CourseModel = require("../models/CourseModel");


exports.Create=async(req,res)=>{
    try {
        const {courseTitle,category}=req.body;
        console.log("id",req.user.id)
        if(!courseTitle || !category){
            return res.status(400).json({message:"coursetitle and category is required"})
        }

        const course=await CourseModel.create({
            courseTitle,
            category,
            creator:req.user.id
            
        })

        res.status(201).json({message:"course created successfully",course})

        
    } catch (error) {
        console.log("error",error)
        return res.status(500).json({message:"Failed to create course"})        
    }
}