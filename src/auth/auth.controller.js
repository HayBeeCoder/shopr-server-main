import bcryptjs from 'bcryptjs'
import { User } from '../resources/user/user.model.js'
import { generateAccessToken } from '../utils/auth.js'
import jwt from 'express-jwt'
import config from '../config/config.js'

const signin = async (req, res, next) => {
    // const { password, username } = req.body
    try {
        const user = await User.findOne({ username: req.body.username })
 
        if(!user ) throw "Wrong password or username was entered!"
        const validPassword = await user.comparePassword(req.body.password)
  
        if(!validPassword)
                throw "Wrong Password was entered bro!"

         const token = generateAccessToken(user)
 
        res.cookie("remember_me", token, {
            maxAge: 86400
        })


        res.status(200).json({
            token,
            // user: { ...user._doc }
            user: {_id: user._id, name: user.name, email: user.email}
        })
    }
     catch (err) {
        res.status(400).json({ err })
    }
}

//this is not necessary, could be done on client side by deleting cookies 
// by setting document.cookies to undefined perhaps.
const signout = (req, res) => {
    res.clearCookie("remember_me")
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

    console.log(req.body.auth._id)
    console.log(req.profile._id.toString())

    console.log( req.profile._id.toString() == req.body.auth._id) 
    const authorized = req.profile && req.body.auth && req.profile._id.toString() ==
        req.body.auth._id
    if (!(authorized)) {
        return res.status('403').json({
            error: "User is not authorized"
        })
    }
    console.log(req.body)
    let a = req.body.data
    req.body = a
    next()
}
export default {
    signin, signout, is_authorized, require_signin
}