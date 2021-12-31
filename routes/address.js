const express = require('express');
const router = express.Router()
const { getallProduct, getProductById } = require('../controllers/product.js')
const { Addaddress, getUserAddress } = require('../controllers/address')
const { authUser  } = require('../controllers/auth')


// router.get('', getallProduct)
// router.get('/:id', getProductById)
router.post('', authUser, Addaddress)
router.get('', authUser, getUserAddress)


module.exports = router