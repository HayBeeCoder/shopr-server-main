import controllers from './user.controller.js'
import { Router } from 'express';

const router = Router()

router
    .route("/")
    .get(controllers.getMany)
    .post(controllers.createOne)
router
    .route('/:userId')
    .get(controllers.getOne)
    .put(controllers.updateOne)
    .delete(controllers.deleteOne)

    router.param("userId", controllers.getOneById)
export default router