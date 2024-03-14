const express = require('express')
const { addMyProduct, getProducts } = require('../controllers/productControllers')
const productRouter = express.Router()


productRouter.route('/add').post(addMyProduct)
productRouter.route('/').get(getProducts)


module.exports = productRouter