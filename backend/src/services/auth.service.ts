import { userRepository } from "../models/user.repository.js";
import { hashValue } from "../utils/bcrypt.js";

export type CreateAccountParams = {
  email: string;
  password: string;
  userAgent?: string;
};
export const createAccount = async (data: CreateAccountParams) => {
  // verify if existing user alread exist
  const existingUser = await userRepository.findByEmail(data.email);
  if (existingUser) {
    throw new Error("User already exists");
  }

  // create user
  const hashedPassword = await hashValue(data.password);

  const user = await userRepository.createUser(data.email, hashedPassword);

  return user;

  // create verification code (ignore for now)
  // send verification email (ignore for now)
  // create session (ignore for now)
  // sign access token & refresh token (ignore for now)
  // return user & tokens (ignore for now)
};
