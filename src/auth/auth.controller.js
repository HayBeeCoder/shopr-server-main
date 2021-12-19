import { User } from '../resources/user/user.model.js'
import { generateAccessToken } from '../utils/auth.js'
import jwt from 'express-jwt'
import config from '../config/config.js'

const signin = async (req, res, next) => {
    // const { password, username } = req.body
    try {
        // console.log(req.body.username)
        const user = await User.find({ username: req.body.username })
        !user && res.status(400).json({ err: "User not found!" })
        // console.log(user)
        // user = user[0]
        // console.log(user)
        // user.authenticate(req.body.password, function (err, isMatch) {
        //     if (err) throw err;
        //     console.log('Password123:', isMatch); // -> Password123: true
        // })
        // console.log(correctPassword)
        // !correctPassword && res.status(400).json({ err: "Username and Password do not match!" })
        const token = generateAccessToken(user)
        console.log(token)
        res.cookie("remember_me", token, {
            maxAge: 86400
        })


        res.status(200).json({
            token,
            user: { ...user }
        })
    } catch (err) {
        res.status(400).json({ err: err })
    }
}

//this is not necessary, could be done on client side by deleting cookies 
// by setting document.cookies to undefined perhaps.
const signout = (req, res) => {
    res.clearCookie("t")
    res.status('200').json({
        message: "User successfully signed out :)"
    })
}

const require_signin = jwt({
    secret: config.jwtSecret,
    userProperty: 'auth',
    algorithms: ['HS256']
})

const is_authorized = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id ==
        req.auth._id
    if (!(authorized)) {
        return res.status('403').json({
            error: "User is not authorized"
        })
    }
    next()
}
export default {
    signin, signout, is_authorized, require_signin
}