import { Request, Response } from "express";
import Joi from "joi";
import { createUser, getUserByEmail } from "../dal/user.dal";
import {
  comparePassword,
  generateToken,
  hashPassword,
} from "../services/auth.service";

/**
 * Register a new user
 *
 */

export const register = async (req: Request, res: Response) => {
  try {
    const _payload = req.body;

    const schema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      role: Joi.string().required(),
    });

    const { error } = schema.validate(_payload);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const hashedPassword = await hashPassword(_payload.password);
    const user = await createUser({ ..._payload, password: hashedPassword });
    return res.status(201).json({
      status: 201,
      data: user,
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

/**
 * Login a user
 * issues access token to the user
 */
export const login = async (req: Request, res: Response) => {
  try {
    const _payload = req.body;
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    const { error } = schema.validate(_payload);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const user = await getUserByEmail(_payload.email);
    if (!user || !(await comparePassword(_payload.password, user.password))) {
      return res.status(401).json({
        status: 401,
        message: "Invalid credentials",
      });
    }
    const token = generateToken(
      user.id,
      user.role,
      user.email,
      user.firstName,
      user.lastName
    );
    return res.status(200).json({
      status: 200,
      data: {
        userId: user.id,
        email: user.email,
        role: user.role,
        name: `${user.firstName} ${user.lastName}`,
        accessToken: token,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Login failed",
    });
  }
};
