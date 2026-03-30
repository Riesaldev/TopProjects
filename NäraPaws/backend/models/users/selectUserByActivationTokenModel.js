import prisma from '../../prisma/prismaClient.js';

// Busca usuario por token de activación
const selectUserByActivationTokenModel = async (activationToken) => {
    return prisma.user.findFirst({
    where: { activationToken },
    });
};

export default selectUserByActivationTokenModel;
