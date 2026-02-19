-- ─── RollForge Database Schema ────────────────────────────────────────────────
-- Run this once against an empty MySQL database to set up all tables.

CREATE DATABASE IF NOT EXISTS rollforge CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE rollforge;

-- ─── Users ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  username      VARCHAR(32) NOT NULL UNIQUE,
  email         VARCHAR(254) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  display_name  VARCHAR(64),
  avatar_url    VARCHAR(512),
  bio           TEXT,
  role          ENUM('player','dm','admin') NOT NULL DEFAULT 'player',
  created_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email)
) ENGINE=InnoDB;

-- ─── Password Reset Tokens ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS password_resets (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id    INT UNSIGNED NOT NULL,
  token_hash VARCHAR(255) NOT NULL,
  expires_at DATETIME NOT NULL,
  used_at    DATETIME,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_token (token_hash)
) ENGINE=InnoDB;

-- ─── Campaigns ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS campaigns (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(128) NOT NULL,
  description TEXT,
  system      VARCHAR(64),
  cover_url   VARCHAR(512),
  owner_id    INT UNSIGNED NOT NULL,
  status      ENUM('active','paused','completed') NOT NULL DEFAULT 'active',
  created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_owner (owner_id)
) ENGINE=InnoDB;

-- ─── Campaign Players ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS campaign_players (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  campaign_id INT UNSIGNED NOT NULL,
  user_id     INT UNSIGNED NOT NULL,
  role        ENUM('dm','player') NOT NULL DEFAULT 'player',
  joined_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id)     REFERENCES users(id)     ON DELETE CASCADE,
  UNIQUE KEY uq_player_campaign (campaign_id, user_id)
) ENGINE=InnoDB;

-- ─── Characters ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS characters (
  id               INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name             VARCHAR(128) NOT NULL,
  image_url        VARCHAR(512),
  background_image VARCHAR(512),
  user_id          INT UNSIGNED NOT NULL,
  campaign_id      INT UNSIGNED,
  system           VARCHAR(64) NOT NULL DEFAULT 'D&D 5e',
  class            VARCHAR(64) NOT NULL DEFAULT 'Fighter',
  race             VARCHAR(64) NOT NULL DEFAULT 'Human',
  level            TINYINT UNSIGNED NOT NULL DEFAULT 1,
  hp               SMALLINT UNSIGNED NOT NULL DEFAULT 10,
  max_hp           SMALLINT UNSIGNED NOT NULL DEFAULT 10,
  ac               TINYINT UNSIGNED NOT NULL DEFAULT 10,
  main_stat        VARCHAR(32) NOT NULL DEFAULT 'STR',
  main_stat_value  TINYINT UNSIGNED NOT NULL DEFAULT 10,
  created_at       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id)     REFERENCES users(id)     ON DELETE CASCADE,
  FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE SET NULL,
  INDEX idx_user (user_id),
  INDEX idx_campaign (campaign_id)
) ENGINE=InnoDB;

-- ─── Resources ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS resources (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  campaign_id INT UNSIGNED NOT NULL,
  uploader_id INT UNSIGNED NOT NULL,
  name        VARCHAR(255) NOT NULL,
  type        ENUM('map','token','handout','audio','pdf','other') NOT NULL DEFAULT 'other',
  url         VARCHAR(512) NOT NULL,
  size_bytes  INT UNSIGNED NOT NULL DEFAULT 0,
  mime_type   VARCHAR(127) NOT NULL DEFAULT 'application/octet-stream',
  created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE CASCADE,
  FOREIGN KEY (uploader_id) REFERENCES users(id)     ON DELETE CASCADE,
  INDEX idx_campaign_type (campaign_id, type)
) ENGINE=InnoDB;

-- ─── Sessions ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS sessions (
  id                INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  campaign_id       INT UNSIGNED NOT NULL,
  title             VARCHAR(128) NOT NULL,
  scheduled_at      DATETIME NOT NULL,
  duration_minutes  SMALLINT UNSIGNED,
  status            ENUM('scheduled','in_progress','completed','cancelled') NOT NULL DEFAULT 'scheduled',
  notes             TEXT,
  FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE CASCADE,
  INDEX idx_campaign_schedule (campaign_id, scheduled_at)
) ENGINE=InnoDB;

-- ─── Compendium ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS compendium (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(128) NOT NULL,
  system      VARCHAR(64) NOT NULL DEFAULT 'D&D 5e',
  description TEXT,
  cover_url   VARCHAR(512),
  file_url    VARCHAR(512),
  author      VARCHAR(128),
  pages       SMALLINT UNSIGNED,
  user_id     INT UNSIGNED NOT NULL,
  created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_system (user_id, system)
) ENGINE=InnoDB;
