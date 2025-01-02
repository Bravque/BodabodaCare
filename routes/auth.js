//import
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser } = require('../controllers/authController');

console.log(registerUser , loginUser , logoutUser );

//user registration
router.post('/submit_registration', registerUser ); 

//user login 
router.post('/login', loginUser );

//user logout
router.post('/logout', logoutUser );

module.exports = router;