-- -----------------------------------------------------
-- Table `Driver`
-- -----------------------------------------------------
CREATE TABLE Driver (
    driver_id INT UNSIGNED PRIMARY KEY,
    license_plate_number VARCHAR(20),
    car_model VARCHAR(50),
    FOREIGN KEY (driver_id) REFERENCES User(user_id) ON DELETE CASCADE
);