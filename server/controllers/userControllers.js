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
const getUser = async (req, res) => {
    const userEmail = req.query.uid
    const user = await User.findOne({ email: userEmail })
    res.json(user)
}
const addFollower = async (req, res) => {
    const { followee, followerEmail } = req.body
    let followeeResponse;
    let followerResponse;
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
        followeeResponse = await User.updateOne({ _id: followee}, {followers: followeeList })

    }
    else {
        // add to the list
        followeeList = [...followeeDetails.followers, followerId]
        followeeResponse = await User.updateOne({ _id: followee}, {followers: followeeList})
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
    }
    else {
        // add to the list.
        followerList = [...followerDetails.following, followee]
        followerResponse = await User.updateOne({ _id: followerId }, { following: followerList })
    }
    res.json({ followeeResponse, followerResponse })
}
module.exports = { addNewUser, getUser, addFollower }