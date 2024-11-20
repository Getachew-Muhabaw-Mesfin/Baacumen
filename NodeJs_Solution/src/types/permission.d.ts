import { Model, Optional } from "sequelize";

export interface IPermissionAttributes {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPermissionCreationAttributes
  extends Optional<IPermissionAttributes, "id"> {}

export interface IPermissionInstance
  extends Model<IPermissionAttributes, IPermissionCreationAttributes>,
    IPermissionAttributes {
  // Instance methods can be added here
}
