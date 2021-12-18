import controllers from './cart.controller.js'
import { Router } from 'express';

const router = Router()
router
    .route("/")
    .get((req,res) => {
        res.status(200).json({cart: "Successful connection to cart in database"})
        console.log("Get request to cart successful")
   
    })
export default router