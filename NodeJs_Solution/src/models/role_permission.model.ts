import { DataTypes, Model, Sequelize } from "sequelize";

export class RolePermission extends Model {
  roleId!: number;
  permissionId!: number;
}

export const initRolePermissionModel = (sequelize: Sequelize) => {
  RolePermission.init(
    {
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "roles",
          key: "id",
        },
      },
      permissionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "permissions",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "RolePermission",
      tableName: "role_permissions",
      timestamps: false, 
    }
  );
};
