const express = require('express');
const { Register, Login, logout, getProfile } = require('../controllers/userControllers');
const { AuthMiddleware } = require('../middlewares/AuthMiddleware');
const router = express.Router();

// Importing the User model
router.post('/register', Register);
router.post('/login',Login)
router.get('/logout',logout)
router.get('/profile',AuthMiddleware,getProfile)

module.exports = router;