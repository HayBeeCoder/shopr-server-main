 import config from '../config/config.js'
import { User } from '../resources/user/user.model.js'
 import jwt from 'jsonwebtoken'

export const generateAccessToken = user =>  jwt.sign({ _id: user._id }, config.jwtSecret)

export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })

// export const signup = async (req, res) => {
//     const user = new User({
//         username: req.body.username,
//         email: req.body.email,
//         password: req.body.password

//     })
//     try{
//         const savedUser = await user.save()
//         res.status(201).json(savedUser)
//     }catch(err){
//         console.error(err)
//     }
    
// }

export const signin = async (req, res) => {
    const user = await User.findOne({ username: req.body.username } ,)
    !user && res.status(401).json("User not found!")

    !(await user.authenticate(req.body.password) ) && res.status(401).json("Wrong password")

    const { password , ...others} = user._doc
    res.status(200).json(others)

}

// export const protect = async (req, res, next) => {
//   next()
// }
