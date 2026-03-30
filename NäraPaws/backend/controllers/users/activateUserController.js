
import selectUserByActivationTokenModel from '../../models/users/selectUserByActivationTokenModel.js';
import updateUserModel from '../../models/users/updateUserModel.js';
import generateError from '../../utils/generateErrorUtil.js';

// Activación segura: activa usando token y expiración
const activateUserController = async (req, res, next) => {
    try {
    const { token } = req.query;
    if (!token) {
        throw generateError('Token required', 400);
    }

    // Busca el usuario por token
    const user = await selectUserByActivationTokenModel(token);
    if (!user || !user.activationTokenExpires || user.activationTokenExpires < new Date()) {
        throw generateError('Invalid or expired token', 400);
    }

    // Activa el usuario y elimina el token
    await updateUserModel(user.id, {
        is_active: true,
        activationToken: null,
        activationTokenExpires: null,
    });

    res.json({ message: 'User activated successfully.' });
    } catch (error) {
    next(error);
    }
};

export default activateUserController;
