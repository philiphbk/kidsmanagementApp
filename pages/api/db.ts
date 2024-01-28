import dotenv from "dotenv";
import { Pool, PoolConnection, createPool } from "mysql2/promise";
import { ConnectionRefusedError } from "sequelize";

dotenv.config();

const connectionOptions = {
  // host: process.env.DB_HOST,
  // user: process.env.DB_USER,
  // password: process.env.DB_PASS,
  // database: process.env.DB_NAME,
  // port: Number(process.env.DB_PORT),
  host: "DESKTOP-76C3JL7",
  user: "root",
  password: "95@SeyiDami",
  database: "kidsappdb",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  connectTimeout: 100000000,
  queueLimit: 0, // Adjust the timeout value as needed (in milliseconds)
};

export async function connectWithRetry(): Promise<PoolConnection> {
  let connection: PoolConnection | null = null;
  const maxRetries = 3; // Maximum number of retry attempts

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const pool: Pool = await createPool(connectionOptions);
      connection = await pool.getConnection();
      console.log("Database connection established successfully.");
      return connection;
    } catch (error) {
      if (error instanceof ConnectionRefusedError) {
        // Retry if the connection was refused
        console.error(`Connection attempt ${attempt} failed. Retrying...`);
      } else {
        // Handle other errors
        console.error("Error connecting to the database:", error);
        throw error;
      }
    } finally {
      // Close the connection if it was created but there was an error
      if (connection) {
        connection.release();
      }
    }

    // Wait for a short duration before retrying
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Adjust the delay as needed
  }

  // If all retry attempts fail, throw an error or handle it accordingly
  throw new Error(
    `Failed to establish a database connection after ${maxRetries} attempts.`
  );
}

export const db = (tableName: string) => {
  const getOne = async (id: string) => {
    try {
      const connection = await connectWithRetry();
      const [rows] = await connection.query(
        `SELECT * FROM ${tableName} WHERE id = ?`, [id]
      );
      connection.release();
      if (!rows) {
        return null;
      }
      return rows;
    } catch (error: any) {
      console.log(`Error getting ${tableName} from DB: `, error);
      throw error;
    }
  }

  const create = async (data: any) => {
    try {
      const connection = await connectWithRetry();
      const [rows] = await connection.query(
        `INSERT INTO ${tableName} SET ?`, [data]
      );
      connection.release();
      if (!rows) {
        return null;
      }
      return rows;
    } catch (error: any) {
      console.log(`Error saving ${tableName} to DB: `, error);
      return null;
    }
  }

  return {
    getOne,
    create
  }
}
