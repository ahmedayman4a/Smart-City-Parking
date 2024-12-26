
-- -----------------------------------------------------
-- Schema parking
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `parking` DEFAULT CHARACTER SET utf8mb4;
USE `parking`;

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
                      age INT,
                      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                      status ENUM('Active', 'Inactive') DEFAULT 'Active'
);

-- -----------------------------------------------------
-- Table `Driver`
-- -----------------------------------------------------
CREATE TABLE Driver (
                        driver_id INT UNSIGNED PRIMARY KEY,
                        license_plate_number VARCHAR(20),
                        car_model VARCHAR(50),
                        FOREIGN KEY (driver_id) REFERENCES User(user_id) ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Table `Admin`
-- -----------------------------------------------------
CREATE TABLE Admin (
                       admin_id INT UNSIGNED PRIMARY KEY,
                       FOREIGN KEY (admin_id) REFERENCES User(user_id) ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Table `ParkingManager`
-- -----------------------------------------------------
CREATE TABLE ParkingManager (
                                manager_id INT UNSIGNED PRIMARY KEY,
                                FOREIGN KEY (manager_id) REFERENCES User(user_id) ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Table `Park`
-- -----------------------------------------------------
CREATE TABLE Park (
                      park_id INT AUTO_INCREMENT PRIMARY KEY,
                      park_name VARCHAR(100),
                      total_slots INT,
                      address VARCHAR(255),
                      rate_per_hour DECIMAL(10, 2),
                      penalty DECIMAL(10, 2),
                      start_price DECIMAL(10, 2),
                      manager_id INT UNSIGNED NOT NULL,
                      FOREIGN KEY (manager_id) REFERENCES ParkingManager(manager_id) ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Table `ParkingSlots`
-- -----------------------------------------------------
CREATE TABLE ParkingSlots (
                              slot_id INT AUTO_INCREMENT PRIMARY KEY,
                              park_id INT NOT NULL,
                              status ENUM('Available', 'Occupied') DEFAULT 'Available',
                              lot_number INT,
                              FOREIGN KEY (park_id) REFERENCES Park(park_id) ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Table `Payment`
-- -----------------------------------------------------
CREATE TABLE Payment (
                         payment_id INT AUTO_INCREMENT PRIMARY KEY,
                         payment_method ENUM('Cash', 'Card', 'Online'),
                         total_amount DECIMAL(10, 2),
                         transaction_id VARCHAR(255),
                         created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                         is_verified BOOLEAN DEFAULT FALSE
);

-- -----------------------------------------------------
-- Table `ParkingHistory`
-- -----------------------------------------------------
CREATE TABLE ParkingHistory (
                                history_id INT AUTO_INCREMENT PRIMARY KEY,
                                driver_id INT UNSIGNED NOT NULL,
                                parking_slot_id INT NOT NULL,
                                start_time DATETIME NOT NULL,
                                end_time DATETIME,
                                payment_id INT,
                                FOREIGN KEY (driver_id) REFERENCES Driver(driver_id) ON DELETE CASCADE,
                                FOREIGN KEY (parking_slot_id) REFERENCES ParkingSlots(slot_id) ON DELETE CASCADE,
                                FOREIGN KEY (payment_id) REFERENCES Payment(payment_id) ON DELETE SET NULL
);

