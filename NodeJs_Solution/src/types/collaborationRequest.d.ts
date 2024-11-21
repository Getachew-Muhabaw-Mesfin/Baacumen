import { Model, Optional } from "sequelize";

/**
 * CollaborationRequestAttributes represents the non-nullable attributes of a collaboration request.
 * These fields are required when interacting with the database.
 */
export interface CollaborationRequestAttributes {
  id: number;
  title: string;
  description: string;
  category: string;
  status: "OPEN" | "CLOSED";
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * CollaborationRequestCreationAttributes represents the attributes required when creating a collaboration request.
 * The 'id' field is optional since it is auto-generated.
 */
export interface CollaborationRequestCreationAttributes
  extends Optional<CollaborationRequestAttributes, "id"> {}

/**
 * CollaborationRequestInstance is the Sequelize instance that allows interaction with a single row of the
 * 'collaborations' table.
 */
export interface ICollaborationRequestInstance
  extends Model<
      CollaborationRequestAttributes,
      CollaborationRequestCreationAttributes
    >,
    CollaborationRequestAttributes {}
