import { Model, DataTypes, Sequelize } from "sequelize";
import Event from "./event.model";
import User from "./user.model";

export class Rsvp extends Model {
  public id!: number;
  public status!: "Going" | "Not Going" | "Maybe";
  public userId!: number;
  public eventId!: number;

  public readonly user?: User;
  public readonly event?: Event;
}

export const initRsvpModel = (sequelize: Sequelize) => {
  Rsvp.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      status: {
        type: DataTypes.ENUM("Going", "Not Going", "Maybe"),
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: User,
          key: "id",
        },
      },
      eventId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: Event,
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "rsvps",
    }
  );
};

/**
 * Associate Rsvp model with other models
 * An rsvp belongs to a user
 * An rsvp belongs to an event
 *
 */
export const associateRsvpModel = () => {
  Rsvp.belongsTo(User, { foreignKey: "userId", as: "user" });
  Rsvp.belongsTo(Event, { foreignKey: "eventId", as: "event" });
};

export default Rsvp;
