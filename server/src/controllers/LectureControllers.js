const CourseModel = require("../models/CourseModel");
const LectureModel = require("../models/LectureModel");

exports.CreateLecture=async(req,res)=>{
    try {
        const {courseId}=req.params;
        const {lectureTitle}=req.body;

        if(!lectureTitle || !courseId){
            return res.status(400).json({message:"lecture title is required"})
        }

        const lecture=await LectureModel.create({
            lectureTitle
        })

        const course=await CourseModel.findById(courseId);
        if(course){
            course.lectures.push(lecture._id);
            await course.save();
        }

        return res.status(200).json({message:"Lecture created successfully!",lecture})
        
    } catch (error) {
         console.log("error",error)
        return res.status(500).json({message:"Failed to create lecture"})    
        
        
    }
}

exports.getCourseLecture=async(req,res)=>{
    try {
        const {courseId}=req.params;
        const course=await CourseModel.findById(courseId).populate("lectures");

        if(!course){
            return res.status(400).json({message:"course not found"})
        }

        return res.status(200).json({message:"course get successfully",lectures:course.lectures})
        
    } catch (error) {

        console.log("error",error)
        return res.status(500).json({message:"Failed to get lecture"})    
        
        
    }
}