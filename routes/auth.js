
//import
const express = require('express');
const { registerUser, loginUser, logoutUser } = require('../controllers/authController');

console.log(registerUser , loginUser , logoutUser );


const router = express.Router();

//user registration
router.post('/register', registerUser );

//user login 
router.post('/login', loginUser );

//user logout
router.post('/logout', logoutUser );

module.exports = router;
