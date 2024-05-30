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
    productComments.reverse()
    if (skip + 5 >= productComments.length) commentLeft = false;
    let finalComments = productComments.slice(skip, skip + 5 <= productComments.length ? skip + 5 : productComments.length)
    let allComments = [];
    for (let i = 0; i < finalComments.length; i++) {
        let userId = await User.findOne({ _id: finalComments[i].user })
        allComments.push({ username: userId.email, comment: finalComments[i].comment })
    }
    console.log("this is the server side.",skip)
    res.json({ finalAllComments:allComments, commentLeft })
    
   /*
    const id = req.query.productId
    const allComments = await Comment.find({ productId: id})
    let responseComments = []
    for (let i = 0; i < allComments.length; i++) {
        let userId = await User.findOne({ _id: allComments[i].user })
        responseComments.push({ username: userId.email, comment: allComments[i].comment })
    }
    responseComments.reverse()
    res.json(responseComments)
    */
}
module.exports = { addNewComment, getAllComments }