import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig";
import { IPermissionInstance } from "../types/permission";

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
