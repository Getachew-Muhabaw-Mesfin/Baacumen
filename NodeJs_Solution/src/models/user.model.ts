import { Model, DataTypes, Sequelize } from "sequelize";
import Event from "./event.model";
import Rsvp from "./rsvp.model";

export class User extends Model {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public role!: "User" | "Admin";
  public password!: string;
  public passwordChangedAt?: Date;
  public readonly createdEvents?: Event[];
  public readonly rsvps?: Rsvp[];

  public toJSON(): object {
    const values = Object.assign({}, this.get());
    delete values.password;
    delete values.passwordChangedAt;
    return values;
  }
}

export const initUserModel = (sequelize: Sequelize) => {
  User.init(
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
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      role: {
        type: DataTypes.ENUM("User", "Admin"),
        allowNull: false,
        defaultValue: "User",
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      passwordChangedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "users",
      timestamps: true,
    }
  );
};

/**
 * Associate User model with other models
 * A user can create multiple events
 * A user can have multiple rsvps
 *
 */
export const associateUserModel = () => {
  User.hasMany(Event, { foreignKey: "organizerId", as: "createdEvents" });
  User.hasMany(Rsvp, { foreignKey: "userId", as: "rsvps" });
};

export default User;
