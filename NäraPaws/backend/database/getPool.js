import mysql2 from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function connectDb() {
    const pool = await mysql2.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    })
    
    console.log('Connected to the database');
    return pool;
}

export default connectDb;