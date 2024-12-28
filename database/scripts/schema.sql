

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema parking
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema parking
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `parking` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `parking` ;

-- -----------------------------------------------------
-- Table `parking`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `parking`.`user` (
                                                `user_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
                                                `first_name` VARCHAR(45) NULL DEFAULT NULL,
    `last_name` VARCHAR(45) NULL DEFAULT NULL,
    `email` VARCHAR(255) NULL DEFAULT NULL,
    `phone` VARCHAR(20) NULL DEFAULT NULL,
    `username` VARCHAR(45) NULL DEFAULT NULL,
    `password` VARCHAR(255) NULL DEFAULT NULL,
    `role` ENUM('Driver', 'Admin', 'ParkingManager') NULL DEFAULT NULL,
    `date_of_birth` DATE NULL DEFAULT NULL,
    `age` INT NULL DEFAULT NULL,
    `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    `status` ENUM('Active', 'Inactive') NULL DEFAULT 'Active',
    PRIMARY KEY (`user_id`),
    UNIQUE INDEX `email` (`email` ASC) VISIBLE,
    UNIQUE INDEX `username` (`username` ASC) VISIBLE)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `parking`.`admin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `parking`.`admin` (
                                                 `admin_id` INT UNSIGNED NOT NULL,
                                                 PRIMARY KEY (`admin_id`),
    CONSTRAINT `admin_ibfk_1`
    FOREIGN KEY (`admin_id`)
    REFERENCES `parking`.`user` (`user_id`)
    ON DELETE CASCADE)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `parking`.`driver`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `parking`.`driver` (
                                                  `driver_id` INT UNSIGNED NOT NULL,
                                                  `license_plate_number` VARCHAR(20) NULL DEFAULT NULL,
    `car_model` VARCHAR(50) NULL DEFAULT NULL,
    PRIMARY KEY (`driver_id`),
    CONSTRAINT `driver_ibfk_1`
    FOREIGN KEY (`driver_id`)
    REFERENCES `parking`.`user` (`user_id`)
    ON DELETE CASCADE)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `parking`.`notification`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `parking`.`notification` (
                                                        `id` INT NOT NULL AUTO_INCREMENT,
                                                        `user_id` INT UNSIGNED NOT NULL,
                                                        `status` ENUM('READ', 'DELIVERED', 'PENDING') NULL DEFAULT 'PENDING',
    `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    `content` TEXT NULL,
    PRIMARY KEY (`id`),
    INDEX `user_id` (`user_id` ASC) VISIBLE,
    CONSTRAINT `notification_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `parking`.`user` (`user_id`)
    ON DELETE CASCADE)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `parking`.`parkingmanager`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `parking`.`parkingmanager` (
                                                          `manager_id` INT UNSIGNED NOT NULL,
                                                          PRIMARY KEY (`manager_id`),
    CONSTRAINT `parkingmanager_ibfk_1`
    FOREIGN KEY (`manager_id`)
    REFERENCES `parking`.`user` (`user_id`)
    ON DELETE CASCADE)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `parking`.`parking_lot`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `parking`.`parking_lot` (
                                                       `id` INT NOT NULL AUTO_INCREMENT,
                                                       `owner_id` INT UNSIGNED NOT NULL,
                                                       `name` VARCHAR(100) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `longitude` DECIMAL(10,7) NOT NULL,
    `latitude` DECIMAL(10,7) NOT NULL,
    `start_price` INT NOT NULL,
    `rate_per_hour` INT NOT NULL,
    `penalty` INT NOT NULL DEFAULT '0',
    `total_spaces` INT NOT NULL,
    `current_occupancy` INT NOT NULL DEFAULT '0',
    `type` ENUM('STANDARD', 'HANDICAP', 'ELECTRIC') NOT NULL DEFAULT 'STANDARD',
    `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `owner_id` (`owner_id` ASC) VISIBLE,
    CONSTRAINT `parking_lot_ibfk_1`
    FOREIGN KEY (`owner_id`)
    REFERENCES `parking`.`parkingmanager` (`manager_id`))
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `parking`.`parking_spot`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `parking`.`parking_spot` (
                                                        `id` INT NOT NULL AUTO_INCREMENT,
                                                        `parking_lot_id` INT NOT NULL,
                                                        `spot_number` INT NOT NULL,
                                                        `status` ENUM('OCCUPIED', 'RESERVED', 'AVAILABLE') NOT NULL DEFAULT 'AVAILABLE',
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `unique_spot` (`parking_lot_id` ASC, `spot_number` ASC) VISIBLE,
    CONSTRAINT `parking_spot_ibfk_1`
    FOREIGN KEY (`parking_lot_id`)
    REFERENCES `parking`.`parking_lot` (`id`))
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `parking`.`parking_sensor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `parking`.`parking_sensor` (
                                                          `id` INT NOT NULL AUTO_INCREMENT,
                                                          `spot_id` INT NOT NULL,
                                                          `status` ENUM('OCCUPIED', 'VACANT', 'FAULTY') NOT NULL DEFAULT 'VACANT',
    `last_updated` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `spot_id` (`spot_id` ASC) VISIBLE,
    CONSTRAINT `parking_sensor_ibfk_1`
    FOREIGN KEY (`spot_id`)
    REFERENCES `parking`.`parking_spot` (`id`))
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `parking`.`reservation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `parking`.`reservation` (
                                                       `id` INT NOT NULL AUTO_INCREMENT,
                                                       `user_id` INT UNSIGNED NOT NULL,
                                                       `spot_id` INT NOT NULL,
                                                       `amount` DECIMAL(10,2) NOT NULL,
    `payment_method` VARCHAR(50) NOT NULL,
    `start` DATETIME NOT NULL,
    `end` DATETIME NOT NULL,
    `status` VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `user_id` (`user_id` ASC) VISIBLE,
    INDEX `spot_id` (`spot_id` ASC) VISIBLE,
    INDEX `start` (`start` ASC) VISIBLE,
    INDEX `end` (`end` ASC) VISIBLE,
    CONSTRAINT `reservation_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `parking`.`user` (`user_id`)
                                                          ON DELETE CASCADE,
    CONSTRAINT `reservation_ibfk_2`
    FOREIGN KEY (`spot_id`)
    REFERENCES `parking`.`parking_spot` (`id`)
                                                          ON DELETE CASCADE)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `parking`.`parkingslots`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `parking`.`parkingslots` (
                                                        `slot_id` INT NOT NULL AUTO_INCREMENT,
                                                        `park_id` INT NOT NULL,
                                                        `status` ENUM('Available', 'Occupied') NULL DEFAULT 'Available',
    `lot_number` INT NULL DEFAULT NULL,
    PRIMARY KEY (`slot_id`),
    INDEX `park_id` (`park_id` ASC) VISIBLE,
    CONSTRAINT `parkingslots_ibfk_1`
    FOREIGN KEY (`park_id`)
    REFERENCES `parking`.`reservation` (`id`)
    ON DELETE CASCADE)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `parking`.`payment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `parking`.`payment` (
                                                   `payment_id` INT NOT NULL AUTO_INCREMENT,
                                                   `payment_method` ENUM('Cash', 'Card', 'Online') NULL DEFAULT NULL,
    `total_amount` DECIMAL(10,2) NULL DEFAULT NULL,
    `transaction_id` VARCHAR(255) NULL DEFAULT NULL,
    `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    `is_verified` TINYINT(1) NULL DEFAULT '0',
    PRIMARY KEY (`payment_id`))
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `parking`.`parkinghistory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `parking`.`parkinghistory` (
                                                          `history_id` INT NOT NULL AUTO_INCREMENT,
                                                          `driver_id` INT UNSIGNED NOT NULL,
                                                          `parking_slot_id` INT NOT NULL,
                                                          `start_time` DATETIME NOT NULL,
                                                          `end_time` DATETIME NULL DEFAULT NULL,
                                                          `payment_id` INT NULL DEFAULT NULL,
                                                          PRIMARY KEY (`history_id`),
    INDEX `driver_id` (`driver_id` ASC) VISIBLE,
    INDEX `parking_slot_id` (`parking_slot_id` ASC) VISIBLE,
    INDEX `payment_id` (`payment_id` ASC) VISIBLE,
    CONSTRAINT `parkinghistory_ibfk_1`
    FOREIGN KEY (`driver_id`)
    REFERENCES `parking`.`driver` (`driver_id`)
    ON DELETE CASCADE,
    CONSTRAINT `parkinghistory_ibfk_2`
    FOREIGN KEY (`parking_slot_id`)
    REFERENCES `parking`.`parkingslots` (`slot_id`)
    ON DELETE CASCADE,
    CONSTRAINT `parkinghistory_ibfk_3`
    FOREIGN KEY (`payment_id`)
    REFERENCES `parking`.`payment` (`payment_id`)
    ON DELETE SET NULL)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
