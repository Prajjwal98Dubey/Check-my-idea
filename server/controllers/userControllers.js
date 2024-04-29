const User = require('../models/userSchema')
const addNewUser = async (req, res) => {
    const { email, name, isFounder } = req.body
    try {
        const checkEmail = await User.findOne({ email: email })
        if (!checkEmail) {
            const user = await User.create({
                email, name, isFounder
            })
            user.save()
            res.json(user)
        }
    }
    catch (error) {
        console.log(error)
    }
}
const getMyDetails = async(req,res)=>{
    const userEmail = req.query.uid
    const user = await User.findOne({ email: userEmail })
    res.json(user)
}
const getUser = async (req, res) => {
    const uid = req.query.uid
    const luser = req.query.luser
    const userDetails = await User.findOne({email:uid})
    const loginUserDetails = await User.findOne({email:luser})
    let isPresent = false;
    let userFollowerSet = new Set(userDetails.followers)
    if (userFollowerSet.size > 0 && userFollowerSet.has(loginUserDetails._id.toString())){
        isPresent = true
    }
    res.json({userDetails,isPresent})
}
const addFollower = async (req, res) => {
    const { followee, followerEmail } = req.body
    let followeeResponse;
    let followerResponse;
    let followerIsFollowing;
    // the one who will be followed
    let followerDetails = await User.findOne({ email: followerEmail })
    let followerId = followerDetails._id
    let followeeDetails = await User.findOne({ _id: followee })
    let followeeList = []
    let followeeListSet = new Set()
    for (let i = 0; i < followeeDetails.followers.length; i++) {
        followeeListSet.add(followeeDetails.followers[i])
    }
    if (followeeListSet.has(followerId.toString())) {
        // remove it from the list
        followeeListSet.delete(followerId.toString())
        followeeListSet.forEach((item) => followeeList.push(item))
        followeeResponse = await User.updateOne({ _id: followee }, { followers: followeeList })
        followerIsFollowing = false

    }
    else {
        // add to the list
        followeeList = [...followeeDetails.followers, followerId]
        followeeResponse = await User.updateOne({ _id: followee }, { followers: followeeList })
        followerIsFollowing = true
    }

    // the one who will follow
    let followerListSet = new Set()
    let followerList = []
    for (let i = 0; i < followerDetails.following.length; i++) {
        followerListSet.add(followerDetails.following[i])
    }
    if (followerListSet.has(followee)) {
        // remove it from the list
        followerListSet.delete(followee)
        followerListSet.forEach((item) => followerList.push(item))
        followerResponse = await User.updateOne({ _id: followerId }, { following: followerList })
        followerIsFollowing = false
    }
    else {
        // add to the list.
        followerList = [...followerDetails.following, followee]
        followerResponse = await User.updateOne({ _id: followerId }, { following: followerList })
        followerIsFollowing = true
    }
    res.json({ followeeResponse, followerResponse, followerIsFollowing })
}
module.exports = { addNewUser, getUser, addFollower ,getMyDetails}


// const isLoginUserPresentEmail = req.query.luser
//     console.log("Login User:-",isLoginUserPresentEmail)
//     const userEmail = req.query.uid
//     console.log("Checking User Email:-",userEmail)

//     let isPresent = false;
//     let isLoginUserPresentId = await User.findOne({ email: isLoginUserPresentEmail })
//     const user = await User.findOne({ email: userEmail })
//     if (user.followers && user.followers.length > 0) {
//         let followerSet = new Set(user.followers)
//         console.log(isLoginUserPresentId)
//         console.log(followerSet)
//         if (followerSet.has(isLoginUserPresentId._id.toString())) {
//             isPresent = true
//         }
//         else {
//             isPresent = false
//         }
//     }

//     res.json({ user, isPresent })