import { Request, Response, NextFunction } from "express";
import { Role } from "../models/role.model";
import { Permission } from "../models/permission.model";

/**
 * Authorization middleware
 * @param roles Array of role names
 * @param permissions Array of permission actions
 */
export const authorize = (roles: string[] = [], permissions: string[] = []) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      if (!user || !user.role) {
        return res.status(403).json({
          status: 403,
          message: "Unauthorized: User role not found.",
        });
      }

      const roleAllowed = roles.length === 0 || roles.includes(user.role.name);

      const userPermissions =
        user.role.permissions?.map((perm) => perm.action) || [];
      const permissionsAllowed =
        permissions.length === 0 ||
        permissions.every((perm) => userPermissions.includes(perm));

      if (!roleAllowed || !permissionsAllowed) {
        return res.status(403).json({
          status: 403,
          message: "Forbidden: Access denied.",
        });
      }

      next();
    } catch (error) {
      console.error("Authorization error:", error);
      return res.status(500).json({
        status: 500,
        message: "Internal server error.",
      });
    }
  };
};
