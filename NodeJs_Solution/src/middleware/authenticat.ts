import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../services/auth.service";
import User from "../models/user.model";

/**
 * This Global declaration is used to extend the Request interface in Express
 * It adds a user property to the Request object
 * This property is used to store the user details extracted from the token
 */
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: string;
      };
    }
  }
}

interface DecodedUser {
  id: string;
  email: string;
  role: string;
}

/**
 * Middleware to authenticate user
 * It extracts the token from the Authorization header
 * Verifies the token and extracts the user details
 * It then attaches the user details to the request object

 */
const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      status: 401,
      message: "Unauthorized Access: Token is required",
    });
  }

  try {
    const decoded = verifyToken(token);
    const user = decoded as DecodedUser;
    //1. check if user exists in the database
    const dbUser = await User.findByPk(user.id);
    if (!dbUser) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }

    //2. attach user details to the request object
    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res
      .status(401)
      .json({ status: 401, message: "Unauthorized Access" });
  }
};

export default authenticate;
