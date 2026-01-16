import VerificationCodeType from "../constants/verificationCodeType.js";
import { userRepository } from "../models/user.repository.js";
import { verificationCodeRepository } from "../models/verificationCode.repository.js";
import { hashValue } from "../utils/bcrypt.js";
import { oneHourFromNow } from "../utils/date.js";
import crypto from "crypto";

export type CreateAccountParams = {
  email: string;
  password: string;
  userAgent?: string;
};
export const createAccount = async (data: CreateAccountParams) => {
  // verify if existing user already exist
  const existingUser = await userRepository.findByEmail(data.email);
  if (existingUser) {
    throw new Error("User already exists");
  }

  // create user
  const hashedPassword = await hashValue(data.password);
  const user = await userRepository.createUser(data.email, hashedPassword);

  // create verification code (go back later)
  const vrCode = crypto.randomUUID();

  await verificationCodeRepository.create({
    userId: user.id,
    type: VerificationCodeType.EmailVerification,
    code: vrCode,
    expiresAt: oneHourFromNow(),
  });

  // send verification email (do later)

  // create session (later)

  // sign access token & refresh token (ignore for now)
  // return user & tokens (ignore for now)
  return user;
};
