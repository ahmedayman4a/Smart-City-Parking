CREATE TABLE `parking_spot` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `parking_lot_id` BIGINT NOT NULL,
    `spot_number` INT NOT NULL,
    `status` ENUM('OCCUPIED', 'RESERVED', 'AVAILABLE') NOT NULL DEFAULT 'AVAILABLE',
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`parking_lot_id`) REFERENCES `parking_lot`(`id`),
    UNIQUE KEY `unique_spot` (`parking_lot_id`, `spot_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
