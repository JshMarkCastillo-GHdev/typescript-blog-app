import "dotenv/config";

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

const getStringEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  if (value === undefined) {
    throw new Error(`Missing environment variable ${key}`);
  }
  return value;
};

// DATABASE ENV
export const DBUSER = getStringEnv("DBUSER");
export const DBPASS = getStringEnv("DBPASS");
export const DBHOST = getStringEnv("DBHOST");
export const DBNAME = getStringEnv("DBNAME");

// PORTS
export const DBPORT = getNumberEnv("DBPORT");
export const SVPORT = getNumberEnv("PORT");

// CORS
export const APPORG = getStringEnv("APP_ORIGIN");
