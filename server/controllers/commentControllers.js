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
    await Product.findOneAndUpdate({ _id: productId }, { comments: [newComment._id, ...productComments.comments] })
    res.json(newComment)

}
const getAllComments = async (req, res) => {
    const id = req.query.productId
    let skip = req.query.skip
    skip = parseInt(skip)
    let commentLeft = true
    const productComments = await Comment.find({ productId: id })
    if (skip + 5 >= productComments.length) commentLeft = false;
    let finalComments = productComments.slice(skip, skip + 5 <= productComments.length ? skip + 5 : productComments.length)
    let allComments = [];
    for (let i = 0; i < finalComments.length; i++) {
        let userId = await User.findOne({ _id: productComments[i].user })
        allComments.push({ username: userId.email, comment: productComments[i].comment })
    }
    res.json({ finalAllComments:allComments, commentLeft })

}
module.exports = { addNewComment, getAllComments }