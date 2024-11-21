import User from "../models/user.model";

export const createUser = async (userData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}) => {
  try {
    const user = await User.create(userData);
    return user;
  } catch (error: any) {
    throw new Error(`Failed to create user: ${error.message}`);
  }
};

export const getUserById = async (id: number) => {
  try {
    const user = await User.findByPk(id, {
      include: [{ association: "createdEvents" }, { association: "rsvps" }],
    });
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    return user;
  } catch (error: any) {
    throw new Error(`Failed to fetch user by ID: ${error.message}`);
  }
};
export const getUserByEmail = async (email: string) => {
  try {
    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      throw new Error(`User with email ${email} not found`);
    }
    return user;
  } catch (error: any) {
    throw new Error(`Failed to fetch user by email: ${error.message}`);
  }
};
