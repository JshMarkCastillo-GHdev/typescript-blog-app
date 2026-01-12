import pool from "../config/db.js";
import type { User } from "./user.types.js";

export const userRepository = {
  async createUser(email: string, password: string): Promise<User> {
    const result = await pool.query(
      `
            
            INSER INTO users(email, password)
            VALUES($1, $2)
            RETURNING *
            `,
      [email, password]
    );
    return result.rows[0];
  },

  async findByEmail(email: string): Promise<User | null> {
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);
    return result.rows[0] || null;
  },
};
