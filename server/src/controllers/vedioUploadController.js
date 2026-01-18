const { uploadMedia } = require("../../utils/cloudinary")

exports.UploadVedio=async(req,res)=>{
    try {
        console.log("file",req.file)

        // if(!req.file || !req.file.mimetype.startsWith("video/")){
        //     return  res.status(400).json({message:"please upload a valid video file"})
        // }

        const result=await uploadMedia(req.file.path);
        console.log("result",result)

        return res.status(200).json({
            success: true, 
            message:"File uploaded successfully", 
            data: result
        })
        
    } catch (error) {
        console.log("error",error)
        return res.status(500).json({ message:"Failed to upload video"})    
    }
}