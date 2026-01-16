import pool from "../config/db.js";
import VerificationCodeType from "../constants/verificationCodeType.js";
import type { VerificationCode } from "./verificationCode.types.js";

export const verificationCodeRepository = {
  async create({
    userId,
    type,
    code,
    expiresAt,
  }: {
    userId: string;
    type: VerificationCodeType;
    code: string;
    expiresAt: Date;
  }): Promise<VerificationCode> {
    const result = await pool.query(
      `
      
      INSERT INTO verification_codes(user_id, type, code, expires_at)
      VALUES($1, $2, $3, $4)
      RETURNING *
      `,
      [userId, type, code, expiresAt]
    );
    return result.rows[0];
  },

  async findValidCode({
    code,
    type,
  }: {
    code: string;
    type: VerificationCodeType;
  }): Promise<VerificationCode | null> {
    const result = await pool.query(
      `SELECT * FROM verification_codes WHERE code = $1 AND type = $2 AND expires_at > NOW()`,
      [code, type]
    );
    return result.rows[0] || null;
  },
  async deleteById(id: string) {
    await pool.query(`DELETE FROM verification_codes WHERE id = $1`, [id]);
  },
};
