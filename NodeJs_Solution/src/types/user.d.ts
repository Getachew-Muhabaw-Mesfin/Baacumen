import { IRoleInstance } from "./role";
import { Model, Optional } from "sequelize";

/**
 * User type declaration
 * User type declaration is used to define the structure of the user model
 *
 */

export interface IUserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: string;
  email: string;
  password: string;
  roleId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserCreationAttributes
  extends Optional<IUserAttributes, "id"> {}

export interface IUserInstance
  extends Model<IUserAttributes, IUserCreationAttributes>,
    IUserAttributes {}
