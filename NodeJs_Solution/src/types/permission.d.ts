import { Model, Optional } from "sequelize";

/**
 * Permission type declaration
 * Permission type declaration is used to define the structure of the permission model
 *
 */

export interface IPermissionAttributes {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Permission instance declaration
 */
export interface IPermissionCreationAttributes
  extends Optional<IPermissionAttributes, "id"> {}

export interface IPermissionInstance
  extends Model<IPermissionAttributes, IPermissionCreationAttributes>,
    IPermissionAttributes {
  addRole: (role: Role) => Promise<void>;
}
