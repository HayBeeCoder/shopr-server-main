import controllers from './order.controller.js'
import { Router } from 'express';

const router = Router()

router
    .route('/')
    .get((req, res) => {
        res.status(200).json({order: "Successful connection to order in database"})
        console.log("Get request to order successful")
   
    }
    )

export default router