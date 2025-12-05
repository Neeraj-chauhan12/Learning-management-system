const { deleteVedioFromCloudinary } = require("../../utils/cloudinary");
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

exports.editLecture=async(req,res)=>{
    try {

        const {lectureTitle,videoInfo,isPreviewFree}=req.body;
        const {courseId,lectureId}=req.params;

        const lecture=await LectureModel.findById(lectureId);

        if(!lecture){
          return res.status(400).json({message:"lecture not found"})
        }

        if(lectureTitle) lecture.lectureTitle=lectureTitle
        if(videoInfo.videoUrl) lecture.videoUrl=videoInfo.videoUrl;
        if(videoInfo.publicId) lecture.publicId=videoInfo.publicId;
        if(isPreviewFree) lecture.isPreviewFree=isPreviewFree

        await lecture.save();

        const course=await CourseModel.findById(courseId)

        if(course && !course.includes(lecture._id)){
            course.lectures.push(lecture._id);
            await course.save();
        }

         return res.status(200).json({message:"lecture updated successfully",course,lecture})
        
        
    } catch (error) {
        console.log("error",error)
        return res.status(500).json({message:"Failed to edit lecture"})    
        
        
    }
}

exports.removeLecture=async(req,res)=>{

    try {
        const {lectureId}=req.params;

    const lecture=await LectureModel.findByIdAndDelete(lectureId)

     if(!lecture){
          return res.status(400).json({message:"lecture not found"})
        }

    //delete from cloudinary
    if(lecture.publicId){
        await deleteVedioFromCloudinary(lecture.publicId)
    }

    await CourseModel.updateOne(
        {lectures:lectureId},
        {$pull:{lectures:lectureId}}
    )

     return res.status(200).json({message:"lecture delete successfully"})
        

        
    } catch (error) {
        console.log("error",error)
        return res.status(500).json({message:"Failed to delete lecture"})    
        
        
    }
    
    

}

exports.getLectureById=async(req,res)=>{

    try {
        const {lectureId}=req.params;

        const lecture=await LectureModel.findById(lectureId)

        if(!lecture){
            return res.status(400).json({message:"lecture not found"})
        }

         return res.status(200).json({message:"lecture find successfully",lecture})
        
    } catch (error) {
         console.log("error",error)
        return res.status(500).json({message:"Failed to delete lecture"})    
        
        
        
    }

}