import { IPermissionInstance } from "./permission";
import { Model, Optional } from "sequelize";

export interface IRoleAttributes {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IRoleCreationAttributes
  extends Optional<IRoleAttributes, "id"> {}

export interface IRoleInstance
  extends Model<IRoleAttributes, IRoleCreationAttributes>,
    IRoleAttributes {
  // Instance methods can be added here
}
