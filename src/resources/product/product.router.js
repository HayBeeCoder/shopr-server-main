import controllers from './product.controller.js'
import { Router } from 'express';
import authController from '../../auth/auth.controller.js';

const router = Router()

router
    .route('/all')
    .get(controllers.getMany)
    .post(controllers.createOne)

router
    .route('/:id')
    .get(controllers.getOne)
    .put(controllers.updateOne)
    .delete(controllers.deleteOne)

router.param("id" , controllers.getOneById)
export default router