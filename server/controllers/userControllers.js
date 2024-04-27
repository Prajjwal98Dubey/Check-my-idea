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
    let follower = await User.findOne({ email: followerEmail })
    const followeeDetails = await User.findOne({_id:followee})
    let followersList;
    followersList = [...(followeeDetails.followers),follower._id]
    const userFollowee = await User.updateOne({_id:followee},{followers:followersList})
    const filter = await User.findOne({_id:follower._id})
    let updatedFollowing = [...filter.following,followee]
    const filterFollowing = await User.updateOne({_id:follower._id},{following:updatedFollowing})
    res.json({ userFollowee, filterFollowing })
}
module.exports = { addNewUser, getUser, addFollower }