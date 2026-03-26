import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function insertUserModel({ name, email, phone, password, role }) {
    return prisma.user.create({
        data: {
            name,
            email,
            phone,
            role,
            password,
            bankid_verified: false,
            profile_image: '',
            bio: '',
            is_active: true,
        },
    });
}