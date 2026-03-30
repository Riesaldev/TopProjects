import Joi from 'joi'

const useRecoveryPassSchema = Joi.object({
    email: Joi.string().email().required(),
    code: Joi.string().length(6).required(),
    newPassword: Joi.string()
        .min(8)
        .max(50)
        .pattern(
            new RegExp(
                '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
            )
        )
        .required(),
})

export default useRecoveryPassSchema
