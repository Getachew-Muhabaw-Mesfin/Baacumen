import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig";
import { IUserInstance } from "../types/user";
import Role from "./role.model";

/**
 * User model
 * User model is used to interact with the users table in the database and
 *
 * A user belongs to a single role
 * But a role can have multiple users
 */

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
