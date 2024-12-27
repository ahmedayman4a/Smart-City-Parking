-- -----------------------------------------------------
-- Schema parking
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `parking`;
CREATE SCHEMA `parking` DEFAULT CHARACTER SET utf8mb4;
USE `parking`;

source database/scripts/user.sql
source database/scripts/driver.sql
source database/scripts/parking_lot.sql
source database/scripts/parking_spot.sql
source database/scripts/parking_sensor.sql
source database/scripts/admin.sql
source database/scripts/parking_manager.sql
source database/scripts/reservation.sql
