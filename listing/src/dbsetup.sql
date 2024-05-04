CREATE DATABASE IF NOT EXISTS `cartier`;
USE `cartier`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);
INSERT INTO `users` (`username`, `password`, `email`)
VALUES ('test', 'password', 'test_user@example.com');