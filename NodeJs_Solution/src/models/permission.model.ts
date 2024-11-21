import { Model, DataTypes, Sequelize } from "sequelize";

export class Permission extends Model {
  public id!: number;
  public action!: string;
}

/**
 * Initialize Permission model
 * Define the Permission model with the properties
 */
export const initPermissionModel = (sequelize: Sequelize) => {
  Permission.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      action: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "permissions",
      timestamps: true,
    }
  );
};

export default Permission;
