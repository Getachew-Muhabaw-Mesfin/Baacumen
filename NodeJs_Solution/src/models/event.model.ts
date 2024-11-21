import { Model, DataTypes, Sequelize } from "sequelize";
import User from "./user.model";
import Rsvp from "./rsvp.model";

/**
 * Event model
 * Event model is used to interact with the events table in the database
 *
 * An event belongs to a user
 * An event can have multiple rsvps
 */
export class Event extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public date!: Date;
  public location!: string;
  public capacity!: number;
  public organizerId!: number;

  public readonly organizer?: User;
  public readonly rsvps?: Rsvp[];
}

export const initEventModel = (sequelize: Sequelize) => {
  Event.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      capacity: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      organizerId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: User,
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "events",
      timestamps: true,
    }
  );
};

/**
 * Associate Event model with other models
 * An event belongs to a user
 * An event can have multiple rsvps
 */
export const associateEventModel = () => {
  Event.belongsTo(User, { foreignKey: "organizerId", as: "organizer" });
  Event.hasMany(Rsvp, { foreignKey: "eventId", as: "rsvps" });
};

export default Event;
