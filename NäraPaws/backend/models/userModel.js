import Db from '../database/database.js';

async function getAllUsers() {
    const db = await Db();
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
}

async function getUserById(id) {
    const db = await Db();
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
}

async function createUser(user) {
    const db = await Db();
    const { name, email, password } = user;
    const [result] = await db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password]);
    return result.insertId;
}

export default {
    getAllUsers,
    getUserById,
    createUser
};