import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/dbConfig";
import { ICollaborationRequestInstance } from "../types/collaborationRequest";

/**
 * CollaborationRequest model
 * This model represents a request made by a startup looking for co-founders, advisors, or other forms of help.
 *
 * A collaboration request can have multiple users responding to it (e.g., through comments or application to the request).
 * The status can be either 'OPEN' or 'CLOSED', indicating whether the request is still active.

 */
const CollaborationRequest = sequelize.define<ICollaborationRequestInstance>(
  "CollaborationRequest",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("OPEN", "CLOSED"),
      defaultValue: "OPEN",
      allowNull: false,
    },
  },
  {
    tableName: "collaborations",
    timestamps: true,
  }
);

export default CollaborationRequest;
