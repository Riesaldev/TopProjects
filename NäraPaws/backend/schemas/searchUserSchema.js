import Joi from 'joi'

const searchUserSchema = Joi.object({
    id: Joi.string().optional(),
    email: Joi.string().email().optional(),
    name: Joi.string().optional(),
    // Puedes agregar más campos de búsqueda según necesidades
}).or('id', 'email', 'name') // Al menos uno requerido

export default searchUserSchema
