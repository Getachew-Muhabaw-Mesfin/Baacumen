import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig";
import { IPermissionInstance } from "../types/permission";

/**
 * Permission model
 * Permission model is used to interact with the permissions table in the database and
 *
 * A permission can be assigned to multiple roles
 * A role can have multiple permissions
 */

const Permission = sequelize.define<IPermissionInstance>(
  "Permission",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "permissions",
    timestamps: true,
  }
);

export default Permission;
