import controllers from './cart.controller.js'
import { Router } from 'express';
import authController from "../../auth/auth.controller.js"

const router = Router()
router
    .route("/")
    // .get((req, res) => {;
    //     res.status(200).json({ cart: "Successful connection to cart in database" })
    //     // console.log("Get request to cart successful")

    // })
    .post(controllers.createOne)

router
    .route('/:userId')
     .get(controllers.getOne)
     .put(authController.require_signin, authController.is_authorized, controllers.updateOne)
    // .put( controllers.updateOne)
    .delete(authController.require_signin, authController.is_authorized, controllers.deleteOne)

router.param("userId", controllers.getOneById)
export default router