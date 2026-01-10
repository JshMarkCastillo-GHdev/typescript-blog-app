import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const dbUser = process.env.USER;
const dbPass = process.env.DBPASS;
const dbPort = 5432;
const dbHost = process.env.DBHOST;
const dbName = process.env.DBNAME;

const { Pool } = pkg;

const pool = new Pool({
  user: dbUser,
  password: dbPass,
  host: dbHost,
  port: dbPort,
  database: dbName,
});

export default pool;
