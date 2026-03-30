import prisma from '../../prisma/prismaClient.js';

// Actualiza cualquier campo del usuario por id
const updateUserModel = async (userId, updateFields) => {
    return prisma.user.update({
    where: { id: userId },
    data: updateFields,
    });
};

export default updateUserModel;
