CREATE TABLE Admin (
    admin_id INT UNSIGNED PRIMARY KEY,
    FOREIGN KEY (admin_id) REFERENCES User(user_id) ON DELETE CASCADE
);