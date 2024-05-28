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
    let skip = req.query.skip;
    skip = parseInt(skip);
    let blogLeft = true;
    const allBlogs = await Blog.find({})
    if (skip+5 >= allBlogs.length) blogLeft = false;
    let responseBlogs = allBlogs.slice(skip,skip+5<=allBlogs.length ? skip+5 : allBlogs.length)
    let finalBlogs = []
    for(let i=0;i<responseBlogs.length;i++){
        let user = await User.findOne({_id:allBlogs[i].author});
        finalBlogs.push({user:user,blog:allBlogs[i]})
    }
    res.json({finalBlogs,blogLeft})
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