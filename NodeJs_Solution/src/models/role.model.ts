import { Model, DataTypes, Sequelize } from "sequelize";
import { Permission } from "./permission.model";

export class Role extends Model {
  public id!: number;
  public name!: string;
  public readonly permissions?: Permission[];
}

/**
 * Initialize Role model
 * Define the Role model with the properties
 */
export const initRoleModel = (sequelize: Sequelize) => {
  Role.init(
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
      sequelize,
      tableName: "roles",
      timestamps: true,
    }
  );
};

/**
 * Associate Role model with Permission model
 * A Role can have many Permissions, and vice versa
 */
export const associateRoleModel = () => {
  Role.belongsToMany(Permission, {
    through: "RolePermissions",
    foreignKey: "roleId",
  });
  Permission.belongsToMany(Role, {
    through: "RolePermissions",
    foreignKey: "permissionId",
  });
};

export default Role;
