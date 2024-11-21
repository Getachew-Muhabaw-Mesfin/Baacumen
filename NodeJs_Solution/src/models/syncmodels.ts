import { Sequelize, DataTypes } from "sequelize";
import dbSequelize from "../config/dbConfig"; 

const db: any = {};

// Initialize models
db.sequelize = dbSequelize;
db.user = require("./user.model")(dbSequelize, DataTypes);
db.role = require("./role.model")(dbSequelize, DataTypes);
db.permission = require("./permission.model")(dbSequelize, DataTypes);

// Export db object
export default db;
