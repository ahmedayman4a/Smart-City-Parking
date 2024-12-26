-- Drop the table if it already exists
DROP TABLE IF EXISTS reservation;

-- Create the reservation table
CREATE TABLE reservation (
    id INT AUTO_INCREMENT PRIMARY KEY,               -- Primary key with auto-increment
    user_id INT NOT NULL,                            -- Foreign key to the user table
    spot_id INT NOT NULL,                            -- Foreign key to the parking spot table
    amount DECIMAL(10, 2) NOT NULL,                  -- Monetary value with up to 2 decimal places
    payment_method VARCHAR(50) NOT NULL,            -- Payment method, e.g., 'CREDIT_CARD', 'CASH'
    start DATETIME NOT NULL,                        -- Reservation start time
    end DATETIME NOT NULL,                          -- Reservation end time
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',  -- Status, e.g., 'PENDING', 'RESERVED', 'CANCELLED'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Record creation timestamp
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Record update timestamp

    -- Indexes for faster queries
    INDEX (user_id),
    INDEX (spot_id),
    INDEX (start),
    INDEX (end),

    -- Constraints for data integrity
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_spot FOREIGN KEY (spot_id) REFERENCES ParkingSpot(id) ON DELETE CASCADE
);
