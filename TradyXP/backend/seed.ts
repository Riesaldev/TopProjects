import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from './models/User.js'

dotenv.config()

const seedUser = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || '')

        // 6ta Ley: Debugging de limpieza
        console.log('[Seed]: Limpiando base de datos de usuarios anteriores...')
        await User.deleteMany({})

        const newUser = new User({
            username: 'TraderPro_01',
            balance: 100,
            virtualCurrency: 500, // Regalo de bienvenida
            xp: 0,
            level: 1,
            rank: 'Novato',
        })

        await newUser.save()

        console.log('------------------------------------------')
        console.log('[Seed]: ¡Usuario de prueba creado con éxito!')
        console.log(`[Seed]: ID: ${newUser._id}`)
        console.log(`[Seed]: Username: ${newUser.username}`)
        console.log('------------------------------------------')
        console.log(
            'Copia el ID arriba para usarlo en tus pruebas de Frontend.'
        )

        process.exit()
    } catch (error) {
        console.error('[SeedError]:', error)
        process.exit(1)
    }
}

seedUser()
