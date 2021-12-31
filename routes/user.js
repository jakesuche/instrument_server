const express = require('express');
const router = express.Router()
const {register, login, updateUserPassword } = require('../controllers/user')
const cors = require('cors')
const { authUser } = require('../controllers/auth')

router.post('/register', register)
router.post('/login', login)
router.post('/updatepassword' , authUser, updateUserPassword)





module.exports = router