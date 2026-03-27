import generateError from '../../utils/generateErrorUtil.js';
import prisma from '../../prisma/prismaClient.js';

const selectUserByEmailModel = async (email) => {
    try {
    const user = await prisma.user.findUnique({
        where: { email },
        select: { id: true, name: true, role: true, password: true }
    });

    if (!user) {
        throw generateError('User not found', 404);
    }
    return user;
    } catch (error) {
    throw generateError(error.message, error.status || 500);
    }
};

export default selectUserByEmailModel;