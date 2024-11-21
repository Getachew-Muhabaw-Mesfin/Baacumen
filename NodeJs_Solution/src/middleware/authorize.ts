import { Request, Response, NextFunction } from "express";

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role as string;
    if (!roles.includes(userRole)) {
      return res.status(403).json({
        status: 403,
        message: "Forbidden",
      });
    }
    next();
  };
};
