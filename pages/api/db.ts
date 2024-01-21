// import mysql from "mysql2/promise";
// import dotenv from "dotenv";

// dotenv.config();

// export async function initializeDatabase() {

//   try {
//     const connection =  await mysql.createConnection({
//       host: process.env.DB_HOST || "localhost",
//       user: process.env.DB_USER || "root",
//       password: process.env.DB_PASS || "",
//       database: process.env.DB_NAME || "test",
//       waitForConnections: true,
//       connectionLimit: 10,
//       connectTimeout: 100000000,
//       queueLimit: 0,
//     });
//     console.log("Database initialized successfully.");
//     connection.end();
//   } catch (error) {
//     console.error("Error initializing database:", error);
//   }
// }

// initializeDatabase();

import { createPool, Pool, PoolConnection } from "mysql2/promise";
import { ConnectionRefusedError } from "sequelize";

const connectionOptions = {
  // Your other connection options
  // host: process.env.DB_HOST || "localhost",
  //   user: process.env.DB_USER || "root",
  //   password: process.env.DB_PASS || "",
  //   database: process.env.DB_NAME || "test",
  host: "DESKTOP-76C3JL7",
  user: "DESKTOP-76C3JL7\\Philip",
  password: "philip95",
  database: "kidsApp",
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
        connection.end();
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
