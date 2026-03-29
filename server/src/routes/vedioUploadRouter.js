const express = require("express");

const { uploadVedio } = require("../controllers/vedioUploadController");
const upload = require("../../utils/multer");

const router = express.Router();

router.post("/", upload.single("file"), uploadVedio);

module.exports = router;
