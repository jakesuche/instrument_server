const express = require('express');
const router = express.Router()
const {register, login, updateUserPassword , updateUserData } = require('../controllers/user')
const cors = require('cors')
const { authUser } = require('../controllers/auth')

router.post('/register', register)
router.post('/login', login)
router.post('/updatepassword' , authUser, updateUserPassword)
router.post('/updateAccount', authUser, updateUserData )






module.exports = router