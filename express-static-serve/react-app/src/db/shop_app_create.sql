-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema shop_app
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema shop_app
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `shop_app` DEFAULT CHARACTER SET latin1 ;
USE `shop_app` ;

-- -----------------------------------------------------
-- Table `shop_app`.`bakery`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shop_app`.`bakery` (
  `id` INT(11) NOT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `price` FLOAT NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `shop_app`.`dairy`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shop_app`.`dairy` (
  `id` INT(11) NOT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `price` FLOAT NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `shop_app`.`gift_cards`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shop_app`.`gift_cards` (
  `code` INT(11) NOT NULL,
  `card_balance` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`code`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `shop_app`.`logininfo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shop_app`.`logininfo` (
  `id` INT(11) NOT NULL,
  `username` VARCHAR(45) NULL DEFAULT NULL,
  `password` VARCHAR(45) NULL DEFAULT NULL,
  `balance` FLOAT NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `shop_app`.`meat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shop_app`.`meat` (
  `id` INT(11) NOT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `price` FLOAT NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `shop_app`.`pantry`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shop_app`.`pantry` (
  `id` INT(11) NOT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `price` FLOAT NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `shop_app`.`produce`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shop_app`.`produce` (
  `id` INT(11) NOT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `price` FLOAT NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `shop_app`.`sale`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shop_app`.`sale` (
  `id` INT(11) NOT NULL,
  `item_name` VARCHAR(45) NULL DEFAULT NULL,
  `quantity` INT(11) NULL DEFAULT NULL,
  `discount_price` FLOAT NULL DEFAULT NULL,
  `base_price` FLOAT NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `shop_app`.`shopcart`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shop_app`.`shopcart` (
  `id` INT(11) NOT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `price` FLOAT NULL DEFAULT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
