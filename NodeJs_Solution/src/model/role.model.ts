import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig";
import { IRoleInstance } from "../types/role";
import Permission from "./permission.model";

const Role = sequelize.define<IRoleInstance>(
  "Role",
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
    tableName: "roles",
    timestamps: true,
  }
);

Role.belongsToMany(Permission, {
  through: "RolePermissions",
  foreignKey: "roleId",
});
Permission.belongsToMany(Role, {
  through: "RolePermissions",
  foreignKey: "permissionId",
});

export default Role;
