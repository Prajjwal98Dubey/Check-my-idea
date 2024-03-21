const Product = require('../models/productSchema')
const User = require('../models/userSchema')
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
const getSingleProduct = async (req, res) => {
    const { id } = req.params
    const product = await Product.findOne({ _id: id })
    if (product) {
        res.json(product)
    }
    else {
        res.json({ message: 'No Product exists with this ID' })
    }
}
const handleUpVote = async (req, res) => {
    const { productId, user } = req.body
    const newUser = await User.findOne({email:user})
    const votes = await Product.findOne({ _id: productId })
    const hash = new Set(votes.voteCount)
    const userId = newUser._id.toString()
    if (hash.has(userId)) {
        hash.delete(userId)
        let newVotes = Array.from(hash)
        const updatedProduct = await Product.findByIdAndUpdate({ _id: productId }, { voteCount: newVotes })
        res.json(updatedProduct)
    }
    else {
        const updatedProduct = await Product.findByIdAndUpdate({ _id: productId }, { voteCount: [...votes.voteCount, userId] })
        res.json(updatedProduct)
    }
}

module.exports = { addMyProduct, getProducts, getSingleProduct, handleUpVote}
