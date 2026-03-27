import Joi from 'joi';

export const registerSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
        .min(8)
        .max(50)
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
        .required()
        .messages({
            'string.pattern.base': 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.'
        }),
    role: Joi.string().valid('user', 'admin').default('user')
});