DELIMITER $$

CREATE TRIGGER after_parking_spot_update
AFTER UPDATE ON parking_spot
FOR EACH ROW
BEGIN
    IF NEW.status = 'AVAILABLE' THEN
        UPDATE reservation
        SET status = 'COMPLETED'
    
        WHERE spot_id = NEW.id
        AND reservation.status = 'ACTIVE'
        AND reservation.start <= NOW();


    END IF;

    IF NEW.status = 'OCCUPIED' THEN
        UPDATE reservation
        SET status = 'ACTIVE'
    
        WHERE spot_id = NEW.id
        AND reservation.status = 'PENDING'
        AND reservation.start <= NOW()
        AND reservation.end >= NOW();

    END IF;
END$$

DELIMITER ;
