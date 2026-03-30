import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import selectUserByEmail from '../../models/users/selectUserByEmailModel.js'

const loginUserController = async (req, res) => {
    // Extract email and password from the request body
    const { email, password } = req.body
    try {
        // Check if the user exists in the database
        const user = await selectUserByEmail(email)
        if (!user) {
            return res
                .status(401)
                .json({ message: 'Invalid email or password' })
        }
        // Compare the provided password with the hashed password stored in the database
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res
                .status(401)
                .json({ message: 'Invalid email or password' })
        }
        // Generate a JWT token for the authenticated user
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        })
        // Return the token and a success message to the client
        return res.json({
            token,
            message: `User ${user.name} logged in successfully`,
        })
    } catch (error) {
        console.error('Error logging in user:', error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

export default loginUserController
