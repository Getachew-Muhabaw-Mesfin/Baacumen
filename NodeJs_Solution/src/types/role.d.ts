import { IPermissionInstance } from "./permission";
import { Model, Optional } from "sequelize";

/**
 * Role type declaration
 * Role type declaration is used to define the structure of the role model
 *
 */

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
  addPermission: (permission: Permission) => Promise<void>;
}
