const { deleteMediaFromCloudinary, uploadMedia } = require("../../utils/cloudinary");
const CourseModel = require("../models/CourseModel");


exports.Create=async(req,res)=>{
    try {
        const { courseTitle, category, description, coursePrice, courseLevel, subTitle } = req.body;
        console.log("id",req.user.id)

        if(!courseTitle || !category){
            return res.status(400).json({message:"coursetitle and category is required"})
        }

        // Normalize courseLevel to match model enum if provided
        let normalizedLevel = undefined
        if (courseLevel) {
          const lvl = String(courseLevel).toLowerCase()
          if (lvl === 'beginner') normalizedLevel = 'Beginner'
          else if (lvl === 'intermediate' || lvl === 'medium') normalizedLevel = 'Medium'
          else if (lvl === 'advanced' || lvl === 'advance') normalizedLevel = 'Advance'
          else normalizedLevel = courseLevel
        }

        const courseData = {
            courseTitle,
            category,
            creator:req.user.id
        }

        if (description) courseData.description = description
        if (subTitle) courseData.subTitle = subTitle
        if (coursePrice !== undefined) courseData.coursePrice = Number(coursePrice)
        if (normalizedLevel) courseData.courseLevel = normalizedLevel

        const course=await CourseModel.create(courseData)

        res.status(201).json({message:"course created successfully",course})

    } catch (error) {
        console.log("error",error)
        return res.status(500).json({message:"Failed to create course"})        
    }
}

exports.getCourseByAdmin=async(req,res)=>{
    try {
        const userId=req.user.id;

        const courses=await CourseModel.find({creator:userId})
        if(!courses){
            return res.status(400).json({message:"Course is not found"})
        }

        res.status(201).json({message:"Course found successfully!",courses})
        
    } catch (error) {
        console.log("error",error)
        return res.status(500).json({message:"Failed to create course"})    
        
    }
}

exports.updateCourse=async(req,res)=>{

    try {
    const courseId=req.params.courseId;
     const { courseTitle, category, description, coursePrice, courseLevel, subTitle } = req.body;
     const thumbnail=req.file;

     let course=await CourseModel.findById(courseId)
     if(!course){
        return res.status(404).json({message:"Course not found"})
     }

     let courseThumbnail;
     if(thumbnail){
        if(course.courseThumbnail){
            const publicId=course.courseThumbnail.split("/").pop().split(".")[0];
            await deleteMediaFromCloudinary(publicId)
        }

        courseThumbnail=await uploadMedia(thumbnail.path)
     }

     const updateData={ courseTitle, category, description, coursePrice, courseLevel, subTitle , courseThumbnail:courseThumbnail?.secure_url}
     course=await CourseModel.findByIdAndUpdate(courseId,updateData,{new:true})
      return res.status(201).json({message:"Course updated successfully",course})
        
    } catch (error) {
         console.log("error",error)
        return res.status(500).json({message:"Failed to update course"})    
        
        
    }
   
    

}