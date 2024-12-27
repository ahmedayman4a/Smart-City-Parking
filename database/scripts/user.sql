
-- -----------------------------------------------------
-- Table `User`
-- -----------------------------------------------------
CREATE TABLE User (
    user_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(45),
    last_name VARCHAR(45),
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20),
    username VARCHAR(45) UNIQUE,
    password VARCHAR(255),
    role ENUM('Driver', 'Admin', 'ParkingManager'),
    date_of_birth DATE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
     age INT,
    status ENUM('Active', 'Inactive') DEFAULT 'Active'
);