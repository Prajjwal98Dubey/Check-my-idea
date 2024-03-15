const Comment = require('../models/commentSchema')
const Product = require('../models/productSchema')

const addNewComment=async(req,res)=>{
    const {user,comment,productId} = req.body
    const newComment = await Comment.create({
        user,comment,productId
    })
    const product = await Product.findOne({_id:productId})
    if (product){
        product.comments = [...product.comments,newComment]
        product.save()
    }
    newComment.save()
    res.json(newComment)

}

module.exports = {addNewComment}