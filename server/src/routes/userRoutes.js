const express = require('express');
const { Register, Login, logout, getProfile, updateProfile } = require('../controllers/userControllers');
const { AuthMiddleware } = require('../middlewares/AuthMiddleware');
const upload = require('../../utils/multer');
const router = express.Router();

// Importing the User model
router.post('/register', Register);
router.post('/login',Login)
router.get('/logout',logout)
router.get('/profile',AuthMiddleware,getProfile)
router.put('/profile/update',AuthMiddleware,upload.single("profilePhoto"),updateProfile)

module.exports = router;