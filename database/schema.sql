# Base de datos SIGTA

CREATE DATABASE IF NOT EXISTS sigta CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE sigta;

CREATE TABLE IF NOT EXISTS roles (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS usuarios (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  fullname VARCHAR(200),
  role_id BIGINT,
  FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE IF NOT EXISTS activos (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(200) NOT NULL,
  category VARCHAR(100),
  location VARCHAR(100),
  status VARCHAR(50),
  acquisition_date DATE,
  campus VARCHAR(150)
);

CREATE TABLE IF NOT EXISTS prestamos (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  asset_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  start_date DATE,
  end_date DATE,
  status VARCHAR(50),
  FOREIGN KEY (asset_id) REFERENCES activos(id),
  FOREIGN KEY (user_id) REFERENCES usuarios(id)
);

CREATE TABLE IF NOT EXISTS movimientos (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  asset_id BIGINT NOT NULL,
  origin VARCHAR(120),
  destination VARCHAR(120),
  responsible VARCHAR(200),
  movement_date DATETIME,
  FOREIGN KEY (asset_id) REFERENCES activos(id)
);
