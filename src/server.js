import express from 'express'
import userRouter from './resources/user/user.router.js'
import orderRouter from './resources/order/order.router.js'
import productRouter from './resources/product/product.router.js'
import cartRouter from './resources/cart/cart.router.js'
import helmet from 'helmet'
import cors from 'cors'
// import { signup  , signin } from "../src/utils/auth.js"
import bodyParser from "body-parser"
import cookieParser from 'cookie-parser'
import compress from 'compression'
import config from './config/config.js'
import authRouter from './auth/auth.router.js'
import { db_connect } from './utils/db.js'

export const app = express()

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())

app.use("/api/users", userRouter)
app.use("/api/order", orderRouter)
app.use("/api/cart", cartRouter)
app.use("/api/product", productRouter)
app.use("/auth", authRouter)
app.get("/testing" , (req,res) => {
    const {name , age} = req.query;
    // res.send({name,age})
    res.status(200).json({name,age})
})

//must be after routes have been mounted 
//and before the export  statement
app.use((err, _, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res
            .status(401)
            .json({
                "error": `${err.name} : ${err.message}`
            })
    }
})

export const ignite = async () => {
    try {
        await db_connect();
        console.log("Succefully connected to database fam!")
        app.listen(config.port, () => {
            console.log("App listening at port " + process.env.PORT)
        })
    } catch (e) {
        console.error(e)
    }
}