import bcryptjs from 'bcryptjs'
import { User } from '../resources/user/user.model.js'
import { generateAccessToken } from '../utils/auth.js'
import jwt from 'express-jwt'
import config from '../config/config.js'

const signin = async (req, res, next) => {
    // const { password, username } = req.body
    try {

        const user = await User.findOne({ username: req.body.username })
       if (!user ) throw new Error ("Wrong username or password.");
        // if (user) {
        //     // console.log(user.password)
        //     // console.log(req.body.password)
        //     // const cmp = await bcryptjs.compare(req.body.password, user.password);
        //     const cmp = user.comparePassword(req.body.password)
           
        //       !cmp &&  res.send("Wrong username or password.");
            
        // } else {
        //     throw new Error("Wrong username or password.");
        // }
        // } catch (error) {
        //     console.log(error);
        //     res.status(500).send("Internal Server error Occured");
        // }
        // =======================

        // if (!user.length) throw "User does not exist!"
        // // !user && new Error("User not found!")
        // console.log(user)

        // // user = user[0]
        // console.log(user.comparePassword)
        // const correctPassword = user.comparePassword(req.body.password, function (err, isMatch) {
        //     console.log(err)
        //     if (err) throw err;
        //     console.log('Password123:', isMatch); // -> Password123: true
        // })
        // console.log(correctPassword)
        // !correctPassword && res.status(400).json({ err: "Username and Password do not match!" })
        const token = generateAccessToken(user)
        //  console.log(token)
        res.cookie("remember_me", token, {
            maxAge: 86400
        })


        res.status(200).json({
            token,
            // user: { ...user._doc }
            user: {_id: user._id, name: user.name, email: user.email}
        })
    } catch (err) {
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