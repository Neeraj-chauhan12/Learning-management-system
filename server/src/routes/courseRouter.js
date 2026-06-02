const express = require("express");
const { AuthMiddleware } = require("../middlewares/AuthMiddleware");
const {
  Create,
  getCourseByAdmin,
  updateCourse,
  togglePublishCourse,
  getCourseById,
  getPublishCourses,
  getAllCourses,
} = require("../controllers/courseControllers");
const upload = require("../../utils/multer");

const router = express.Router();

router.post("/", AuthMiddleware, Create);
router.get("/publish-courses", AuthMiddleware, getPublishCourses);
router.get("/get", AuthMiddleware, getCourseByAdmin);
//router.get('/:courseId',AuthMiddleware,getCourseByAdmin)
router.put(
  "/:courseId",
  AuthMiddleware,
  upload.single("thumbnail"),
  updateCourse,
);
router.get("/all", getAllCourses);
router.patch("/:courseId", AuthMiddleware, togglePublishCourse);
router.get("/course/:courseId", AuthMiddleware, getCourseById)

module.exports = router;
