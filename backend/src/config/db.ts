import pkg from "pg";
import { DBUSER, DBPASS, DBHOST, DBPORT, DBNAME } from "../constants/env.js";

const { Pool } = pkg;

const pool = new Pool({
  user: DBUSER,
  password: DBPASS,
  host: DBHOST,
  port: DBPORT,
  database: DBNAME,
});

export default pool;
