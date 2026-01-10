import dotenv from "dotenv";

dotenv.config();

// Returns the PORT Number from env
const getNumberEnv = (key: string, defaultValue?: number): number => {
  const value = process.env[key];

  if (value === undefined) {
    if (defaultValue !== undefined) return defaultValue;
    throw new Error(`Missing environment variable ${key}`);
  }

  const parsed = Number(value);

  if (Number.isNaN(parsed)) {
    throw new Error(`Environment variable ${key} must be a number.`);
  }

  return parsed;
};

export const DBUSER = process.env.DBUSER;
export const DBPASS = process.env.DBPASS;
export const DBHOST = process.env.DBHOST;
export const DBNAME = process.env.DBNAME;
export const DBPORT = getNumberEnv("DBPORT");
