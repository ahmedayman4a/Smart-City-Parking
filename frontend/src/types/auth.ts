export interface BaseUserDTO {
    email: string;
    password: string;
    username: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    birthDate: Date;
  }
  
  export interface DriverDTO extends BaseUserDTO {
    licensePlateNumber: string;
    carModel: string;
  }
  
  export interface ManagerDTO extends BaseUserDTO {}
  
  export enum Role {
    Driver = 'Driver',
    ParkingManager = 'ParkingManager'
  }
  
  export enum Status {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'
  }