import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig";
import { IRoleInstance } from "../types/role";
import Permission from "./permission.model";

/**
 * Role model
 * Role model is used to interact with the roles table in the database and
 *
 * A role can have multiple permissions
 * A permission can be assigned to multiple roles
 *
 * A role can have multiple users
 */

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
