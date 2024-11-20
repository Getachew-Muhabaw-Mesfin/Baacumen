import Role from "../model/role.model";
import Permission from "../model/permission.model";
import rolesPermissionsData from "../data/rolesPermissionsData";

async function initializeRolesAndPermissions() {
  try {
    /**
     * Loop through the rolesPermissionsData array and create roles and permissions
     * Assign permissions to roles
     * If the role or permission already exists, it will not be created again
     */
    for (const roleData of rolesPermissionsData) {
      const [role] = await Role.findOrCreate({
        where: { name: roleData.role },
      });

      /**
       * Loop through the permissions array and create permissions
       * Assign permissions to the role
       * If the permission already exists, it will not be created again
       */
      for (const permissionName of roleData.permissions) {
        const [permission] = await Permission.findOrCreate({
          where: { name: permissionName },
        });

        await role.addPermission(permission);
      }
    }

    console.log("Roles and permissions initialized successfully.");
  } catch (error) {
    console.error("Error initializing roles and permissions:", error);
  }
}

export default initializeRolesAndPermissions;
