const express = require('express');
const { Register, Login, logout } = require('../controllers/userControllers');
const router = express.Router();

// Importing the User model
router.post('/register', Register);
router.post('/login',Login)
router.get('/logout',logout)

module.exports = router;