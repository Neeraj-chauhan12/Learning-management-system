const {  uploadVedio } = require("../../utils/cloudinary");
const fs=require('fs')


exports.uploadVedio = async (req, res) => {
     try {
        console.log("file", req.file);
        const result = await uploadVedio(req.file.path);
        res.status(200).json({
          success: true,
          message: "File uploaded successfully",
          data: result,
        });
      } catch (error) {
        console.log("error", error);
        return res.status(500).json({ message: "Failed to upload video" });
      }

  
}