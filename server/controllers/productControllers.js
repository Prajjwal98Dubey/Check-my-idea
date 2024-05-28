const Product = require('../models/productSchema')
const User = require('../models/userSchema')
const client = require('redis')
const addMyProduct = async (req, res) => {
    const { name, logo, founder, founderMessage, shortDescription, longDescription, linkToWeb, comments, keywords, voteCount } = req.body
    const newProduct = await Product.create({
        name, logo, founder, founderMessage, shortDescription, longDescription, linkToWeb, comments, keywords, voteCount
    })
    newProduct.save()
    res.json(newProduct)
}
/// redis key ->  "allProductKey"
const getProducts = async (req, res) => {
    const redisClient = client.createClient({})
    await redisClient.connect()
    const allProductKey = await redisClient.GET("allProductKey")
    let response;
    if(allProductKey){
        response = JSON.parse(allProductKey);
    }
    else{
        let products = await Product.find()
        await redisClient.SETEX("allProductKey",300,JSON.stringify(products))
        response=products
    }
    res.json(response)
}
const getSingleProduct = async (req, res) => {
    const { id } = req.params
    let redisClient = client.createClient({})
    redisClient.on('error', (err) => console.log("Redis Client Error"))
    await redisClient.connect()
    if (await redisClient.GET(`productId-${id}`)) {
        const productObj = await redisClient.GET(`productId-${id}`)
        res.json(JSON.parse(productObj))
    }
    else {
        const product = await Product.findOne({ _id: id })
        if (product) {

            await redisClient.SET(`productId-${id}`, JSON.stringify(product))
            res.json(product)
        }
        else {
            res.json({ message: 'No Product exists with this ID' })
        }
    }
}
const handleUpVote = async (req, res) => {
    const { productId, user } = req.body
    const userDetails = await User.findOne({ email: user })
    const product = await Product.findOne({ _id: productId })
    const userInVoteCountSet = new Set(product.voteCount)
    let votes = [];
    let redisClient = client.createClient({})
    redisClient.on('error', (err) => console.log("Redis Client Error"))
    await redisClient.connect()
    if (userInVoteCountSet.has(userDetails._id.toString())) {
        userInVoteCountSet.delete(userDetails._id.toString())
        userInVoteCountSet.forEach((voters) => votes.push(voters))
        let productObj = await redisClient.GET(`productId-${productId}`)
        let productObjJSON = JSON.parse(productObj)
        productObjJSON.voteCount = votes
        await redisClient.SET(`productId-${productId}`, JSON.stringify(productObjJSON))
        await Product.updateOne({ _id: productId }, { voteCount: votes })
    }
    else {
        let productObj = await redisClient.GET(`productId-${productId}`)
        votes = [...product.voteCount, userDetails._id.toString()]
        let productObjJSON = JSON.parse(productObj)
        productObjJSON.voteCount = votes
        await redisClient.SET(`productId-${productId}`, JSON.stringify(productObjJSON))
        await Product.updateOne({ _id: productId }, { voteCount: votes })
    }
    res.json(votes)
}
const getUpVoteCount = async (req, res) => {
    const productId = req.query.productId
    let redisClient = client.createClient({})
    redisClient.on('error', (err) => console.log("Redis Client Error"))
    await redisClient.connect()
    let product;
    if(await redisClient.GET(`productId-${productId}`)){
        let productJSON = await redisClient.GET(`productId-${productId}`)
        product = JSON.parse(productJSON)
    }
    else{
        product = await Product.findOne({ _id: productId })
    }
    res.json(product.voteCount)
}
/*
    GET_INSTANT_API = "http:/localhost:3001/api/v1/products?skip=0"
*/
const getInstantProduct=async(req,res)=>{
    let skip = req.query.skip;
    skip = parseInt(skip);
    let itemLeft = true;
    const products = await Product.find();
    if (skip+5>=products.length) itemLeft = false
    let responseProduct = products.slice(skip, skip+5<=products.length ? skip+5 : products.length);
    res.json({items:responseProduct,itemLeft})

}

module.exports = { addMyProduct, getProducts, getSingleProduct, handleUpVote, getUpVoteCount,getInstantProduct }

// 174ms
