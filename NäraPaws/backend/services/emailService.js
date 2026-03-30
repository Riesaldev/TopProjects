import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const emailUser = process.env.EMAIL_USER
const emailPass = process.env.EMAIL_PASS
const resetUrl = process.env.RESET_URL

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: emailUser,
        pass: emailPass,
    },
})

const sendRecoveryCode = async (email, code) => {
    const mailOptions = {
        from: emailUser,
        to: email,
        subject: 'Password Recovery Code',
        html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
                <a href="${resetUrl}?token=${code}">Restablecer contraseña</a>`,
        text: `Haz clic en el siguiente enlace para restablecer tu contraseña: ${resetUrl}?token=${code}`,
    }

    try {
        await transporter.sendMail(mailOptions)
        console.log('Recovery email sent to:', email)
    } catch (error) {
        console.error('Error sending email:', error)
        throw new Error('Failed to send recovery email')
    }
}

export default { sendRecoveryCode }
