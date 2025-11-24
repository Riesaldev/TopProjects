// filepath: c:\Users\Ricardoea\blurry\Server\src\database\database.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseService implements OnModuleInit {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async onModuleInit() {
    // Verificar si las tablas existen antes de crearlas
    await this.createTablesIfNotExist();
  }

  private async createTablesIfNotExist() {
    try {
      // Verificar si la tabla users existe
      const userTableExists = await this.tableExists('users');
      if (!userTableExists) {
        await this.dataSource.query(`
          CREATE TABLE users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) NOT NULL UNIQUE,
            password_hash VARCHAR(255) NOT NULL,
            role VARCHAR(50) NOT NULL DEFAULT 'user',
            display_name VARCHAR(255) NOT NULL UNIQUE,
            age INT NOT NULL,
            gender VARCHAR(50) NOT NULL,
            location VARCHAR(255) NOT NULL,
            values_profile JSON,
            is_suspended BOOLEAN NOT NULL DEFAULT false,
            suspension_reason VARCHAR(255),
            suspension_until DATETIME,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
          );
        `);
        console.log('Tabla users creada exitosamente');
      }

      // Aquí puedes agregar más tablas si es necesario
    } catch (error) {
      console.error('Error al crear tablas:', error);
    }
  }

  private async tableExists(tableName: string): Promise<boolean> {
    const result = await this.dataSource.query(
      `SELECT COUNT(*) as count FROM information_schema.tables 
       WHERE table_schema = ? AND table_name = ?`,
      [process.env.DB_NAME || 'blurry', tableName]
    );
    return result[0].count > 0;
  }
}