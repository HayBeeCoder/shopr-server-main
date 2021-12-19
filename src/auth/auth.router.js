import { Router } from 'express';
import authController from "./auth.controller.js"
const router = Router()

router.route("/signin")
      .post(authController.signin) 
      
router.route("/signout")
       .get(authController.signout) 

export default router