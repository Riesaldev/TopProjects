import Joi from 'joi'

const passwordRecoverySchema = Joi.object({
    email: Joi.string().email().required(),
})

export default passwordRecoverySchema
