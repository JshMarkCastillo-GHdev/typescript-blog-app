import catchErrors from "../utils/catchErrors.js";
import { z } from "zod";

const registerSchema = z
  .object({
    // REMINDER: email: z.string().email() is deprecated as per ZOD 4.
    email: z.email().min(1).max(255),
    password: z.string().min(6).max(255),
    confirmPassword: z.string().min(6).max(255),
    userAgent: z.string().optional(),
  })
  // REMINDER: message parameter is replaced by error in ZOD 4
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const registerHandler = catchErrors(async (req, res) => {
  // validate request
  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });
  // call service
  // response
});
