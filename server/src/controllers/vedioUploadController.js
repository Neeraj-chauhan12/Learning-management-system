const { uploadMedia } = require("../../utils/cloudinary")

exports.UploadVedio=async(req,res)=>{
    try {

        const result=await uploadMedia(req.file.path);
        res.status(200).json({success:true,message:"File uploaded successfully",data:result})
        
    } catch (error) {
         console.log("error",error)
        return res.status(500).json({message:"Failed to upload vedio"})    
        
        
        
    }
}