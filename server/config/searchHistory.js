const express = require('express')
const User = require('../models/userSchema')
const Product = require('../models/productSchema')
const historyRouter = express.Router()
const redis = require('redis')
// -> "key-32dj23uq9weid-search-history"
const addSearchedQueryToRedis=async(req,res)=>{
        let redisClient = await redis.createClient({})
        await redisClient.connect()
        const {email,searchQuery} = req.body
        const product = await Product.findOne({_id:searchQuery})
        const user  = await User.findOne({email:email})
        const userId = user._id;
        let response = [];
        let userSearchHistory = await redisClient.GET(`key-${userId}-search-history`)
        if(userSearchHistory){
            const parsedUserSearchHistoryList = JSON.parse(userSearchHistory)
            parsedUserSearchHistoryList.push(product)
            await redisClient.SET(`key-${userId}-search-history`,JSON.stringify(parsedUserSearchHistoryList))
            response = parsedUserSearchHistoryList
        }
        else{
            let userSearchHistoryList = [product];
            await redisClient.SET(`key-${userId}-search-history`,JSON.stringify(userSearchHistoryList))
            response = userSearchHistoryList
        }
        res.json(response)
}
// -> "key-32dj23uq9weid-search-history"

const getMySearchHistory=async(req,res)=>{
    let redisClient = await redis.createClient({})
    await redisClient.connect()
    const email = req.query.email
    const user = await User.findOne({email:email})
    const userId = user._id
    const userKeyInRedis = await redisClient.GET(`key-${userId}-search-history`)
    let response = [];
    if (userKeyInRedis){
            response = JSON.parse(userKeyInRedis).reverse().slice(0,3);
    }
    res.json(response)

}

historyRouter.route('/add-query').post(addSearchedQueryToRedis)
historyRouter.route('/get-my-search-history').get(getMySearchHistory)


module.exports = historyRouter;