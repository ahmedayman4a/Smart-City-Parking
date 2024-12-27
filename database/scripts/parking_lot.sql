CREATE TABLE `parking_lot` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `owner_id` INT UNSIGNED NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `longitude` DECIMAL(10, 7) NOT NULL,
    `latitude` DECIMAL(10, 7) NOT NULL,
    `start_price` INT NOT NULL,
    `rate_per_hour` INT NOT NULL,
    `penalty` INT NOT NULL DEFAULT 0,
    `total_spaces` INT NOT NULL,
    `current_occupancy` INT NOT NULL DEFAULT 0,
    `type` ENUM('STANDARD', 'HANDICAP', 'ELECTRIC') NOT NULL DEFAULT 'STANDARD',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`owner_id`) REFERENCES `ParkingManager`(`manager_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
