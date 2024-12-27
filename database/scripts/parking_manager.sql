CREATE TABLE ParkingManager (
    manager_id INT UNSIGNED PRIMARY KEY,
    FOREIGN KEY (manager_id) REFERENCES User(user_id) ON DELETE CASCADE
);