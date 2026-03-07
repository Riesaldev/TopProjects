import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPhotosToUser1772880859286 implements MigrationInterface {
    name = 'AddPhotosToUser1772880859286'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password_hash\` varchar(255) NOT NULL, \`role\` varchar(255) NOT NULL DEFAULT 'user', \`display_name\` varchar(255) NOT NULL, \`age\` int NULL, \`gender\` varchar(255) NULL, \`location\` varchar(255) NULL, \`values_profile\` json NULL, \`bio\` varchar(255) NULL, \`interests\` varchar(255) NULL, \`imagen_perfil\` varchar(255) NULL, \`photos\` json NULL, \`tokens\` int NOT NULL DEFAULT '0', \`is_suspended\` tinyint NOT NULL DEFAULT 0, \`suspension_reason\` varchar(255) NULL, \`suspension_until\` datetime NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), UNIQUE INDEX \`IDX_a72fa0bb46a03bedcd1745efb4\` (\`display_name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`matches\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_a_id\` int NOT NULL, \`user_b_id\` int NOT NULL, \`score\` int NULL, \`status\` varchar(255) NOT NULL, \`match_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`notifications\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`match_id\` int NULL, \`rating\` int NULL, \`comment\` varchar(255) NULL, \`message\` varchar(255) NULL, \`type\` varchar(255) NULL, \`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`feedback\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`match_id\` int NOT NULL, \`rating\` int NOT NULL, \`comment\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`contacts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`contact_id\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tokens\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`amount\` int NOT NULL, \`reason\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`reports\` (\`id\` int NOT NULL AUTO_INCREMENT, \`reported_user_id\` int NOT NULL, \`type\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, \`admin_notes\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`reports_generated\` (\`id\` int NOT NULL AUTO_INCREMENT, \`generated_by\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL, \`start_date\` datetime NOT NULL, \`upupdate\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`settings\` (\`id\` int NOT NULL AUTO_INCREMENT, \`key\` varchar(255) NOT NULL, \`value\` varchar(255) NOT NULL, \`updated_by\` varchar(255) NULL, \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`activity_logs\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`action\` varchar(255) NOT NULL, \`metadata\` json NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`admin_interactions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`sender_id\` int NOT NULL, \`receiver_id\` int NOT NULL, \`message\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`purchases\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`product_name\` varchar(255) NOT NULL, \`price\` decimal(10,2) NOT NULL DEFAULT '0.00', \`quantity\` int NOT NULL DEFAULT '1', \`total\` decimal(10,2) NOT NULL DEFAULT '0.00', \`status\` varchar(255) NOT NULL DEFAULT 'pending', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`notes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`contact_id\` int NULL, \`content\` text NOT NULL, \`date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`agenda_events\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`datetime\` datetime NOT NULL, \`note\` varchar(255) NULL, \`contact_id\` int NULL, \`completed\` tinyint NOT NULL DEFAULT 0, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`services_status\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(255) NOT NULL, \`estado\` varchar(255) NOT NULL DEFAULT 'Activo', \`price\` decimal(10,2) NOT NULL DEFAULT '0.00', \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sanctions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NULL, \`usuario\` varchar(255) NULL, \`sancion\` varchar(255) NOT NULL, \`estado\` varchar(255) NOT NULL DEFAULT 'Activa', \`fecha\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`games\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`category\` varchar(255) NOT NULL DEFAULT 'game', \`price\` decimal(10,2) NOT NULL DEFAULT '0.00', \`image_url\` varchar(255) NULL, UNIQUE INDEX \`UQ_games_name_category\` (\`name\`, \`category\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`products\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`price\` decimal(10,2) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`chat_messages\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`contact_id\` int NOT NULL, \`sender_id\` int NOT NULL, \`content\` text NOT NULL, \`timestamp\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`achievements\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`icon\` varchar(255) NULL, \`token_reward\` int NOT NULL DEFAULT '0', \`secret\` tinyint NOT NULL DEFAULT 0, UNIQUE INDEX \`IDX_b2d2ec6547a003ee5b43a71dbe\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_achievements\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`achievement_id\` int NOT NULL, \`date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`missions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`goal\` int NOT NULL DEFAULT '1', \`action\` varchar(255) NOT NULL, \`reward_tokens\` int NOT NULL DEFAULT '0', \`secret\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_missions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`mission_id\` int NOT NULL, \`progress\` int NOT NULL DEFAULT '0', \`completed\` tinyint NOT NULL DEFAULT 0, \`assigned_at\` varchar(32) NOT NULL, \`completed_at\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`streaks\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`current_streak\` int NOT NULL DEFAULT '0', \`max_streak\` int NOT NULL DEFAULT '0', \`last_activity\` varchar(16) NULL, UNIQUE INDEX \`IDX_7ef06a4f4177b11885dd5fb8b2\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_7ef06a4f4177b11885dd5fb8b2\` ON \`streaks\``);
        await queryRunner.query(`DROP TABLE \`streaks\``);
        await queryRunner.query(`DROP TABLE \`user_missions\``);
        await queryRunner.query(`DROP TABLE \`missions\``);
        await queryRunner.query(`DROP TABLE \`user_achievements\``);
        await queryRunner.query(`DROP INDEX \`IDX_b2d2ec6547a003ee5b43a71dbe\` ON \`achievements\``);
        await queryRunner.query(`DROP TABLE \`achievements\``);
        await queryRunner.query(`DROP TABLE \`chat_messages\``);
        await queryRunner.query(`DROP TABLE \`products\``);
        await queryRunner.query(`DROP INDEX \`UQ_games_name_category\` ON \`games\``);
        await queryRunner.query(`DROP TABLE \`games\``);
        await queryRunner.query(`DROP TABLE \`sanctions\``);
        await queryRunner.query(`DROP TABLE \`services_status\``);
        await queryRunner.query(`DROP TABLE \`agenda_events\``);
        await queryRunner.query(`DROP TABLE \`notes\``);
        await queryRunner.query(`DROP TABLE \`purchases\``);
        await queryRunner.query(`DROP TABLE \`admin_interactions\``);
        await queryRunner.query(`DROP TABLE \`activity_logs\``);
        await queryRunner.query(`DROP TABLE \`settings\``);
        await queryRunner.query(`DROP TABLE \`reports_generated\``);
        await queryRunner.query(`DROP TABLE \`reports\``);
        await queryRunner.query(`DROP TABLE \`tokens\``);
        await queryRunner.query(`DROP TABLE \`contacts\``);
        await queryRunner.query(`DROP TABLE \`feedback\``);
        await queryRunner.query(`DROP TABLE \`notifications\``);
        await queryRunner.query(`DROP TABLE \`matches\``);
        await queryRunner.query(`DROP INDEX \`IDX_a72fa0bb46a03bedcd1745efb4\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
