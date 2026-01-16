// this contains the interface of the verification code
import VerificationCodeType from "../constants/verificationCodeType.js";

export interface VerificationCode {
  id: string;
  user_id: string;
  type: VerificationCodeType;
  code: string;
  expires_at: Date;
  created_at: Date;
}
