import userModel from "../models/userModel.js";

async function getAllUsers() {
    return await userModel.getAllUsers();
}

async function createUser(user) {
    return await userModel.createUser(user);
}

export default {
    getAllUsers,
    createUser
};