import controllers from './user.controller.js'
import { Router } from 'express';
import authController from '../../auth/auth.controller.js';

const router = Router()

router
    .route("/")
    .get( controllers.getMany)
    .post(controllers.createOne)
router
    .route('/:userId')
    .get(authController.require_signin ,controllers.getOne)
    .put(authController.require_signin , authController.is_authorized , controllers.updateOne)
    .delete(authController.require_signin , authController.is_authorized ,controllers.deleteOne)

    router.param("userId", controllers.getOneById)
export default router