const express = require('express');
const router = express.Router()
const { getallProduct, getProductById } = require('../controllers/product.js')


router.get('', getallProduct)
router.get('/:id', getProductById)


module.exports = router
// router.get('', getallProduct)

// module.exports = router