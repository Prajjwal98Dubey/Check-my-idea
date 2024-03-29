const Blog = require('../models/blogSchema')
const User = require('../models/userSchema')
const createBlog = async (req, res) => {
    const { title, description, author, topics } = req.body
    const userId = await User.findOne({email:author})
    try {
        const newBlog = await Blog.create({ title, description, author:userId._id, topics })
        newBlog.save()
        res.json(newBlog)
    }
    catch (error) {
        res.json(error)
    }
}
const getAllBlogs = async(req,res)=>{
    const allBlogs = await Blog.find({})
    res.json(allBlogs)
}
const getMyBlogs =async(req,res)=>{
    const userEmail = req.query.id
    const user = await User.findOne({email:userEmail})
    const myBlogs = await Blog.find({author:user._id})
    res.json(myBlogs)
}
const deleteMyBlog = async(req,res)=>{
    const blogId = req.query.id
    await Blog.findByIdAndDelete({_id:blogId})
}

const editMyBlog = async(req,res)=>{
    const {updatedTitle,updatedDescription,blogId} = req.body
    const blog = await Blog.findByIdAndUpdate({_id:blogId},{
        title:updatedTitle,
        description:updatedDescription
    })
    res.json(blog)
}

module.exports = { createBlog,getAllBlogs,getMyBlogs,deleteMyBlog,editMyBlog }