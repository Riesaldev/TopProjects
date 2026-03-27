import Joi from 'joi';

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
            .min(8)
            .max(50)
            .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
            .required()
            .messages({
                'string.pattern.base': 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.'
            }),
    repeatPassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only': 'Repeat password must match the password.'
    })
});