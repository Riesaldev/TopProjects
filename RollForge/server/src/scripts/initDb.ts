import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';
import { env } from '../config/environment.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function initDb() {
  console.log('⏳ Starting database initialization...');

  // Create a connection specifically to run the schema, 
  // without specifying the database initially since the schema creates it.

  const connection = await mysql.createConnection({
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    multipleStatements: true,
  });

  try {
    const schemaPath = path.resolve(__dirname, '../../schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf-8');

    console.log(`Executing SQL script from: ${schemaPath}`);
    
    // Execute multiple statements
    await connection.query(schemaSql);

    console.log('✅ Database initialization completed successfully.');
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

initDb();
