// db.ts
import { createPool, Pool } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool: Pool = createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "test",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
