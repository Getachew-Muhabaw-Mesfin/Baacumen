import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig";
import { IUserInstance } from "../types/user";
import { IRoleInstance } from "../types/role";
import Role from "./role.model"; // Import the Role model

const User = sequelize.define<IUserInstance>(
  "User",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Role,
        key: "id",
      },
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

User.belongsTo(Role, { foreignKey: "roleId" });

export default User;
