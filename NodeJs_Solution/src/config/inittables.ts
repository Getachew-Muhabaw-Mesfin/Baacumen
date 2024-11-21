import User from "../model/user.model";
import Role from "../model/role.model";
import Permission from "../model/permission.model";
import CollaborationRequest from "../model/collaborationRequest.model";

const initTables = async () => {
  try {
    await User.sync({ force: false });
    await Role.sync({ force: false });
    await Permission.sync({ force: false });
    await CollaborationRequest.sync({ force: false });

    console.log("Tables initialized successfully");
  } catch (error) {
    console.error("Error initializing tables:", error);
  }
};

export default initTables;


