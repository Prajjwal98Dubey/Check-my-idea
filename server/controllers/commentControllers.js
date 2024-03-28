const Comment = require('../models/commentSchema')
const Product = require('../models/productSchema')
const User = require('../models/userSchema')
const addNewComment = async (req, res) => {
    const { user, comment, productId } = req.body
    const userEmail = await User.findOne({ email: user })
    const userId = userEmail._id
    const newComment = await Comment.create({
        user: userId, comment, productId
    })
    newComment.save()
    const productComments = await Product.findOne({ _id: productId })
    await Product.findOneAndUpdate({ _id: productId }, { comments: [newComment._id,...productComments.comments] })
    res.json(newComment)

}
const getAllComments = async (req, res) => {
    const id = req.query.productId
    const productComments = await Comment.find({ productId: id })
    let response = []
    for (let i = 0; i < productComments.length; i++) {
        let userId = await User.findOne({ _id: productComments[i].user })
        response.push({ username: userId.email, comment: productComments[i].comment })
    }
    res.json(response)

}
module.exports = { addNewComment, getAllComments }