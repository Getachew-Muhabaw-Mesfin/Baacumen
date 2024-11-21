import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRATION = process.env.JWT_EXPIRES_IN as string;

/**
 * Hash password function
 * Hash the password using bcrypt and return the hashed password
 */
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

/**
 * Compare password function
 * Compare the password with the hash password
 */
export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

/**
 * Generate token function
 * Generate token using jwt and return the token
 */
export const generateToken = (
  userId: number,
  role: string,
  email: string,
  firstName: string,
  lastName: string
): string => {
  return jwt.sign(
    { id: userId, role, email, firstName, lastName },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRATION,
    }
  );
};

/**
 * Verify token function
 * Verify the token using jwt and return the payload
 */
export const verifyToken = (token: string): any => {
  return jwt.verify(token, JWT_SECRET);
};
