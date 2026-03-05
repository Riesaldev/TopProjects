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
    await this.ensureRuntimeSchemaAdjustments();
    await this.seedGamesCatalogIfEmpty();
    await this.seedProductsCatalogIfEmpty();
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

      const tokensTableExists = await this.tableExists('tokens');
      if (!tokensTableExists) {
        await this.dataSource.query(`
          CREATE TABLE tokens (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            amount INT NOT NULL,
            reason VARCHAR(255) NOT NULL,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
          );
        `);
        console.log('Tabla tokens creada exitosamente');
      }

      const notesTableExists = await this.tableExists('notes');
      if (!notesTableExists) {
        await this.dataSource.query(`
          CREATE TABLE notes (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            contact_id INT NULL,
            content TEXT NOT NULL,
            date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
          );
        `);
        console.log('Tabla notes creada exitosamente');
      }

      const purchasesTableExists = await this.tableExists('purchases');
      if (!purchasesTableExists) {
        await this.dataSource.query(`
          CREATE TABLE purchases (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            product_name VARCHAR(255) NOT NULL,
            price DECIMAL(10,2) NOT NULL DEFAULT 0,
            quantity INT NOT NULL DEFAULT 1,
            total DECIMAL(10,2) NOT NULL DEFAULT 0,
            status VARCHAR(255) NOT NULL DEFAULT 'pending',
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
          );
        `);
        console.log('Tabla purchases creada exitosamente');
      }

      const agendaEventsTableExists = await this.tableExists('agenda_events');
      if (!agendaEventsTableExists) {
        await this.dataSource.query(`
          CREATE TABLE agenda_events (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            title VARCHAR(255) NOT NULL,
            description VARCHAR(255) NULL,
            datetime DATETIME NOT NULL,
            note VARCHAR(255) NULL,
            contact_id INT NULL,
            completed BOOLEAN NOT NULL DEFAULT false,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
          );
        `);
        console.log('Tabla agenda_events creada exitosamente');
      }

      const gamesTableExists = await this.tableExists('games');
      if (!gamesTableExists) {
        await this.dataSource.query(`
          CREATE TABLE games (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            category VARCHAR(32) NOT NULL DEFAULT 'game',
            image_url VARCHAR(255) NULL
          );
        `);
        console.log('Tabla games creada exitosamente');
      }

      const productsTableExists = await this.tableExists('products');
      if (!productsTableExists) {
        await this.dataSource.query(`
          CREATE TABLE products (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            price DECIMAL(10,2) NOT NULL DEFAULT 0
          );
        `);
        console.log('Tabla products creada exitosamente');
      }

      const notificationsTableExists = await this.tableExists('notifications');
      if (!notificationsTableExists) {
        await this.dataSource.query(`
          CREATE TABLE notifications (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            match_id INT NULL,
            rating INT NULL,
            comment VARCHAR(255) NULL,
            message VARCHAR(255) NULL,
            type VARCHAR(255) NULL,
            created_at DATETIME NULL DEFAULT CURRENT_TIMESTAMP
          );
        `);
        console.log('Tabla notifications creada exitosamente');
      }

      const chatMessagesTableExists = await this.tableExists('chat_messages');
      if (!chatMessagesTableExists) {
        await this.dataSource.query(`
          CREATE TABLE chat_messages (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            contact_id INT NOT NULL,
            sender_id INT NOT NULL,
            content TEXT NOT NULL,
            timestamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
          );
        `);
        console.log('Tabla chat_messages creada exitosamente');
      }

      const achievementsTableExists = await this.tableExists('achievements');
      if (!achievementsTableExists) {
        await this.dataSource.query(`
          CREATE TABLE achievements (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL UNIQUE,
            description TEXT NOT NULL,
            icon VARCHAR(255) NULL,
            token_reward INT NOT NULL DEFAULT 0,
            secret BOOLEAN NOT NULL DEFAULT false
          );
        `);
        console.log('Tabla achievements creada exitosamente');
      }

      const userAchievementsTableExists = await this.tableExists('user_achievements');
      if (!userAchievementsTableExists) {
        await this.dataSource.query(`
          CREATE TABLE user_achievements (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            achievement_id INT NOT NULL,
            date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
          );
        `);
        console.log('Tabla user_achievements creada exitosamente');
      }

      const missionsTableExists = await this.tableExists('missions');
      if (!missionsTableExists) {
        await this.dataSource.query(`
          CREATE TABLE missions (
            id INT AUTO_INCREMENT PRIMARY KEY,
            type VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            goal INT NOT NULL DEFAULT 1,
            action VARCHAR(255) NOT NULL,
            reward_tokens INT NOT NULL DEFAULT 0,
            secret BOOLEAN NOT NULL DEFAULT false
          );
        `);
        console.log('Tabla missions creada exitosamente');
      }

      const userMissionsTableExists = await this.tableExists('user_missions');
      if (!userMissionsTableExists) {
        await this.dataSource.query(`
          CREATE TABLE user_missions (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            mission_id INT NOT NULL,
            progress INT NOT NULL DEFAULT 0,
            completed BOOLEAN NOT NULL DEFAULT false,
            assigned_at VARCHAR(32) NOT NULL,
            completed_at DATETIME NULL
          );
        `);
        console.log('Tabla user_missions creada exitosamente');
      }

      const streaksTableExists = await this.tableExists('streaks');
      if (!streaksTableExists) {
        await this.dataSource.query(`
          CREATE TABLE streaks (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL UNIQUE,
            current_streak INT NOT NULL DEFAULT 0,
            max_streak INT NOT NULL DEFAULT 0,
            last_activity VARCHAR(16) NULL
          );
        `);
        console.log('Tabla streaks creada exitosamente');
      }
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

  private async columnExists(tableName: string, columnName: string): Promise<boolean> {
    const result = await this.dataSource.query(
      `SELECT COUNT(*) as count FROM information_schema.columns
       WHERE table_schema = ? AND table_name = ? AND column_name = ?`,
      [process.env.DB_NAME || 'blurry', tableName, columnName],
    );
    return Number(result?.[0]?.count ?? 0) > 0;
  }

  private async ensureRuntimeSchemaAdjustments() {
    try {
      const gamesExists = await this.tableExists('games');
      if (gamesExists) {
        const categoryExists = await this.columnExists('games', 'category');
        if (!categoryExists) {
          await this.dataSource.query(
            `ALTER TABLE games ADD COLUMN category VARCHAR(32) NOT NULL DEFAULT 'game' AFTER description`,
          );
          console.log('Columna games.category creada exitosamente');
        }

        await this.dataSource.query(`
          UPDATE games
          SET category = CASE
            WHEN name IN ('Quien Conoce Mejor a Quien', 'Preguntas Rompehielo', 'Test de Lenguajes del Amor') THEN 'test'
            ELSE 'game'
          END
        `);
      }
    } catch (error) {
      console.error('Error ajustando esquema runtime:', error);
    }
  }

  private async seedGamesCatalogIfEmpty() {
    try {
      const gamesExists = await this.tableExists('games');
      if (!gamesExists) return;

      const result = await this.dataSource.query('SELECT COUNT(*) as count FROM games');
      const count = Number(result?.[0]?.count ?? 0);
      if (count > 0) return;

      await this.dataSource.query(`
        INSERT INTO games (name, description, category, image_url)
        VALUES
          ('3 en Raya para Parejas', 'Version cooperativa de tres en raya para romper el hielo y hablar entre turnos.', 'game', '/games/tres-en-raya.jpg'),
          ('Hundir la Flota: Duelo Ligero', 'Mini partida por turnos con preguntas sorpresa cada vez que hay impacto.', 'game', '/games/hundir-la-flota.jpg'),
          ('Quien Conoce Mejor a Quien', 'Test de 10 preguntas sobre gustos y rutinas para descubrir compatibilidad.', 'test', '/games/conoce-mejor.jpg'),
          ('Preguntas Rompehielo', 'Cartas de conversacion rapidas para primeras videollamadas.', 'test', '/games/rompehielo.jpg'),
          ('Test de Lenguajes del Amor', 'Cuestionario corto para entender como cada persona expresa afecto.', 'test', '/games/lenguajes-amor.jpg'),
          ('Verdad o Reto Suave', 'Retos y preguntas en tono amable para crear confianza sin incomodar.', 'game', '/games/verdad-reto.jpg')
      `);

      console.log('Catalogo inicial de games/tests sembrado exitosamente');
    } catch (error) {
      console.error('Error sembrando catalogo de games:', error);
    }
  }

  private async seedProductsCatalogIfEmpty() {
    try {
      const productsExists = await this.tableExists('products');
      if (!productsExists) return;

      const result = await this.dataSource.query('SELECT COUNT(*) as count FROM products');
      const count = Number(result?.[0]?.count ?? 0);
      if (count > 0) return;

      await this.dataSource.query(`
        INSERT INTO products (name, description, price)
        VALUES
          ('Pack Rompehielo Esencial', 'Acceso a preguntas guiadas para primeras conversaciones y dinamicas de confianza.', 4.99),
          ('Pack Noche de Juegos', 'Incluye juegos para pareja como 3 en raya, retos y duelos ligeros durante videollamada.', 7.99),
          ('Pack Test de Compatibilidad', 'Coleccion de tests para conocerse mejor: valores, comunicacion y estilo de relacion.', 9.99),
          ('Pack Premium Date Night', 'Combina juegos, tests y bonus de dinamicas para una cita virtual mas divertida.', 14.99)
      `);

      console.log('Catalogo inicial de products sembrado exitosamente');
    } catch (error) {
      console.error('Error sembrando catalogo de products:', error);
    }
  }
}