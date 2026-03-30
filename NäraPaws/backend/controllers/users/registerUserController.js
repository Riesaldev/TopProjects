import bcrypt from 'bcrypt'

import { insertUserModel } from '../../models/users/insertUserModel.js'

export default async function registerUserController(req, res) {
    try {
        const { name, email, phone, password, role } = req.body

        if (!name || !email || !phone || !password || !role) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        // Verifica si el usuario ya existe
        // (puedes mantener la lógica aquí o moverla a un modelo/servicio si prefieres)
        const { PrismaClient } = await import('@prisma/client')
        const prisma = new PrismaClient()
        const existingUser = await prisma.user.findUnique({ where: { email } })
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' })
        }

        // Inserta el usuario usando el modelo
        const user = await insertUserModel({
            name,
            email,
            phone,
            role,
            password: await bcrypt.hash(password, 10),
        })

        // Nunca devuelvas la contraseña
        const { password: _, ...userWithoutPassword } = user
        res.status(201).json({
            message: 'User registered successfully',
            user: userWithoutPassword,
        })
    } catch (error) {
        console.error('Error registering user:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}
