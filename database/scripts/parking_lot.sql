CREATE TABLE `parking_lot` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `longitude` DECIMAL NOT NULL,
    `latitude` DECIMAL NOT NULL,
    `total_spaces` INT NOT NULL,
    `current_occupancy` INT NOT NULL DEFAULT 0,
    `status` ENUM('ACTIVE', 'MAINTENANCE', 'CLOSED') NOT NULL DEFAULT 'ACTIVE',
    `type` ENUM('STANDARD', 'HANDICAP', 'ELECTRIC') NOT NULL DEFAULT 'STANDARD',
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;