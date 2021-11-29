-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema shop_app
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema shop_app
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `shop_app` DEFAULT CHARACTER SET utf8 ;
USE `shop_app` ;

-- -----------------------------------------------------
-- Table `shop_app`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shop_app`.`Users` (
  `id` INT NOT NULL,
  `username` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `balance` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `shop_app`.`Gift_Cards`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shop_app`.`Gift_Cards` (
  `id` INT NOT NULL,
  `user_id` INT NULL,
  `card_balance` FLOAT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `shop_app`.`Products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shop_app`.`Products` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `price` FLOAT NULL,
  `category` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
