const express = require('express')
const { addMyProduct, getProducts, getSingleProduct, handleUpVote, getUpVoteCount, getInstantProduct } = require('../controllers/productControllers')
const productRouter = express.Router()


productRouter.route('/add').post(addMyProduct)
productRouter.route('/').get(getProducts)
productRouter.route('/p').get(getInstantProduct)
productRouter.route('/single/:id').get(getSingleProduct)
productRouter.route('/upvote').post(handleUpVote)
productRouter.route('/upvote-count').get(getUpVoteCount)
module.exports = productRouter