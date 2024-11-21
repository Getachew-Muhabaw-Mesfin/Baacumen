import sequelize from "../config/dbConfig";

/**
 * Initialize Models and sync with the database
 * This function initializes all the models and syncs them with the database
 * It should be called before starting the server
 * For simple Relationships defined here
 */

import { initUserModel, associateUserModel } from "./user.model";
import { initEventModel, associateEventModel } from "./event.model";
import { initRsvpModel, associateRsvpModel } from "./rsvp.model";
import { initRoleModel, associateRoleModel } from "./role.model";
import { initPermissionModel } from "./permission.model";
const syncModels = async () => {
  try {
    initUserModel(sequelize);
    initEventModel(sequelize);
    initRsvpModel(sequelize);
    initRoleModel(sequelize);
    initPermissionModel(sequelize);
    await sequelize.sync({ force: true });

    associateUserModel();
    associateEventModel();
    associateRsvpModel();
    associateRoleModel();

    console.log("---------------Database synchronized successfully----------");
  } catch (error) {
    console.error("Error initializing models:", error);
  }
};

export default syncModels;
