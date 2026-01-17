const  cloudinary   =require('cloudinary')
const dotenv=require('dotenv')
dotenv.config();


cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})

exports.uploadMedia=async(file)=>{
    try {
        const uploadResponse=await cloudinary.uploader.upload(file,{
            resource_type:"auto"
        })
        return uploadResponse
    } catch (error) {
        console.log("Cloudinary upload error:",error)
        throw error
    }
}

exports.deleteMediaFromCloudinary=async(publicId)=>{
    try {
        const result = await cloudinary.uploader.destroy(publicId)
        return result
    } catch (error) {
        console.log("Cloudinary delete error:",error)
        throw error
    }
}

exports.deleteVedioFromCloudinary=async(publicId)=>{
    try {
        const result = await cloudinary.uploader.destroy(publicId,{
            resource_type:"video"
        })
        return result
    } catch (error) {
        console.log("Cloudinary video delete error:",error)
        throw error
    }
}