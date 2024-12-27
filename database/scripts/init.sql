-- -----------------------------------------------------
-- Schema parking
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `parking`;
CREATE SCHEMA `parking` DEFAULT CHARACTER SET utf8mb4;
USE `parking`;

source user.sql
source driver.sql
source parking_lot.sql
source parking_spot.sql
source parking_sensor.sql
source admin.sql
source parking_manager.sql
