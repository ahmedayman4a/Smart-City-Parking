-- -----------------------------------------------------
-- Schema parking
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `parking`;
CREATE SCHEMA `parking` DEFAULT CHARACTER SET utf8mb4;
USE `parking`;

source user.sql
source driver.sql
source admin.sql
source parking_manager.sql