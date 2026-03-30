import express from 'express'
import updateUserController from '../../controllers/users/privateUserProfileController.js'
import joiValidation from '../../middlewares/joiValidatorMiddleware.js'
import updateUserSchema from '../../schemas/updateUserSchema.js'

const router = express.Router()

router.put('/update', joiValidation(updateUserSchema), updateUserController)

export default router
