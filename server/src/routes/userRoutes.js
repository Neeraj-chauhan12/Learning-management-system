const express = require('express');
const { Register, Login, logout, getProfile, updateProfile } = require('../controllers/userControllers');
const { AuthMiddleware } = require('../middlewares/AuthMiddleware');
const router = express.Router();

// Importing the User model
router.post('/register', Register);
router.post('/login',Login)
router.get('/logout',logout)
router.get('/profile',AuthMiddleware,getProfile)
router.put('/profile/update',AuthMiddleware,updateProfile)

module.exports = router;