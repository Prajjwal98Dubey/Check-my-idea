const express = require('express')
const { addMyProduct, getProducts, getSingleProduct, handleUpVote } = require('../controllers/productControllers')
const productRouter = express.Router()


productRouter.route('/add').post(addMyProduct)
productRouter.route('/').get(getProducts)
productRouter.route('/single/:id').get(getSingleProduct)
productRouter.route('/upvote').post(handleUpVote)




module.exports = productRouter