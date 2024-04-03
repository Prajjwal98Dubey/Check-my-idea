const User = require('../models/userSchema')
const addNewUser = async (req, res) => {
    const { email,name,isFounder } = req.body
    try {
        const checkEmail = await User.findOne({ email: email })
        if (!checkEmail) {
            const user = await User.create({
                email,name,isFounder
            })
            user.save()
            res.json(user)
        }
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = { addNewUser }