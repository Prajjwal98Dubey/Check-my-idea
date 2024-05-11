const express = require('express')
const searchRouter = express.Router()
const client = require('redis')
const User = require('../models/userSchema')
const Product = require('../models/productSchema')

const searchResult = async (req, res) => {
    const searchText = req.query.s
    let redisClient = client.createClient({})
    redisClient.on('error', (err) => console.log("Redis Client Error"))
    await redisClient.connect()
    let getAllUsers = [];
    let getAllProducts = [];
    let recommendedUsers = [];
    let recommendedProducts = [];
    if (await redisClient.GET("allUserKey") && await redisClient.GET("allProductKey")) {
        let allUserData = await redisClient.GET("allUserKey")
        let allProductsData = await redisClient.GET("allProductKey")
        recommendedUsers = JSON.parse(allUserData).filter((user) => user.email.toLowerCase().includes(searchText.toLowerCase()))

        recommendedProducts = JSON.parse(allProductsData).filter((prod) => prod.name.toLowerCase().includes(searchText.toLowerCase()) || prod.shortDescription && prod.shortDescription.toLowerCase().includes(searchText.toLowerCase()) || prod.longDescription && prod.longDescription.toLowerCase().includes(searchText.toLowerCase()))

    }
    else {
        getAllUsers = await User.find({})
        getAllProducts = await Product.find({})
        await redisClient.SET("allUserKey", JSON.stringify(getAllUsers))
        await redisClient.SET("allProductKey", JSON.stringify(getAllProducts))
        recommendedUsers = getAllUsers.filter((user) => user.email.toLowerCase().includes(searchText.toLowerCase()))

        recommendedProducts = getAllProducts.filter((prod) => prod.name.toLowerCase().includes(searchText.toLowerCase()) || prod.shortDescription && prod.shortDescription.toLowerCase().includes(searchText.toLowerCase()) || prod.longDescription && prod.longDescription.toLowerCase().includes(searchText.toLowerCase()))

    }
    res.json({ users: recommendedUsers, products: recommendedProducts })
}
searchRouter.route('/content').get(searchResult)


module.exports = searchRouter
