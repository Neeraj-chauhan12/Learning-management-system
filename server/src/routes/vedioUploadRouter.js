const express = require("express");
const upload = require("../../utils/multer");
const { uploadMedia } = require("../../utils/cloudinary");

const router = express.Router();

router.post("/", upload.single("file"), async (req, res) => {
  try {
    console.log("file", req.file);

    const result = await uploadMedia(req.file.path);
    console.log("result", result);

    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      data: result,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "Failed to upload video" });
  }
});

module.exports = router;
