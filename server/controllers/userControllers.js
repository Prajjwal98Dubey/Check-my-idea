const User = require('../models/userSchema')
const addNewUser = async (req, res) => {
    const { email } = req.body
    try {
        const checkEmail = await User.findOne({ email: email })
        if (!checkEmail) {
            const user = await User.create({
                email
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