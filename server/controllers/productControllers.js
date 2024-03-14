const Product = require('../models/productSchema')

const addMyProduct = async (req, res) => {
    const { name, logo, shortDescription, longDescription, linkToWeb, comments, keywords, voteCount } = req.body
    const newProduct = await Product.create({
        name, logo, shortDescription, longDescription, linkToWeb, comments, keywords, voteCount
    })
    newProduct.save()
    res.json(newProduct)
}


const getProducts = async (req, res) => {
    const products = await Product.find()
    res.json(products)
}

module.exports = { addMyProduct, getProducts }
