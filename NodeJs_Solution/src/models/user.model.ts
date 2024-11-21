import { Model, DataTypes, Sequelize } from "sequelize";
import Event from "./event.model";
import Rsvp from "./rsvp.model";
import { initRoleModel, Role } from './role.model';

export class User extends Model {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;
  public passwordChangedAt?: Date;
  public readonly createdEvents?: Event[];
  public readonly rsvps?: Rsvp[];
  public readonly role?: Role;
  public roleId!: number;

  /**
   * Password should not be returned in the response
   * PasswordChangedAt should not be returned in the response
   * Return the user object without password and passwordChangedAt
   */
  public toJSON(): object {
    const values = Object.assign({}, this.get());
    delete values.password;
    delete values.passwordChangedAt;
    return values;
  }
}

/**
 * Initialize User model
 * Define the User model with the properties
 */
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
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      passwordChangedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      roleId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "roles",
          key: "id",
        },
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
 * A user must have one role, so we associate it here
 */
export const associateUserModel = () => {
  User.belongsTo(Role, { foreignKey: "roleId" });
  User.hasMany(Event, { foreignKey: "organizerId", as: "createdEvents" });
  User.hasMany(Rsvp, { foreignKey: "userId", as: "rsvps" });
};

export default User;
