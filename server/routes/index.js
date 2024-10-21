const express = require('express');
const registerUser = require('../controller/registerUser.contoller');
const checkEmail = require('../controller/checkEmail.controller');
const checkPassword = require('../controller/checkPassword.controller');
const userDetails = require('../controller/userDetail.controller');
const logout = require('../controller/logout.controller');
const updateUserDetails = require('../controller/updateUserDetails.controller');
const searchUser = require('../controller/searchUser.controller');

const router = express.Router()


// create User API
router.post('/register', registerUser)

//check User Email
router.post('/email', checkEmail)

//check Password
router.post('/password', checkPassword)

//login User
router.get('/user-details', userDetails)

//logout User
router.get('/logout', logout)

//Update User details
router.post('/update-user', updateUserDetails)

//search user
router.post("/search-user",searchUser)

module.exports = router