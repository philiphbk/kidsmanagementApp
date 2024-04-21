import dotenv from "dotenv";
import { Pool, createPool, RowDataPacket } from "mysql2/promise";

dotenv.config();

interface TextSearchParams {
  searchTerm: string;
  offset: number;
  pageSize: number;
}

interface PaginationParams {
  offset?: number; // Starting point for fetching the rows
  limit?: number; // Number of rows to fetch
}

let pool: Pool;

export async function getPool(): Promise<Pool> {
  if (!pool) {
    pool = createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      connectTimeout: 100000000,
      queueLimit: 0,
    });
  }

  console.log("Database connection established successfully.");
  return pool;

  // try {
  // } catch (error) {
  //   console.error("Error connecting to the database:", error);
  // }
}
export const db = {
  async getAll<T extends RowDataPacket[]>(
    tableName: string,
    paginationParams?: PaginationParams
  ): Promise<T> {
    const connPool = await getPool();
    const { offset = 0, limit = 10 } = paginationParams || {}; // Provide default values if not specified
    const sql = `SELECT * FROM ${tableName} LIMIT ? OFFSET ?`;
    const [rows] = await connPool.query<T>(sql, [limit, offset]);
    return rows;
  },

  async getOne<T extends RowDataPacket>(
    tableName: string,
    id: string
  ): Promise<T | null> {
    const connPool = await getPool();
    const [rows] = await connPool.query<T[]>(
      `SELECT * FROM ${tableName} WHERE id = ?`,
      [id]
    );
    return rows.length > 0 ? rows[0] : null;
  },

  async getByEmail<T extends RowDataPacket[]>(
    tableName: string,
    email: string
  ): Promise<T | null> {
    const connPool = await getPool();
    const [rows] = await connPool.query<T>(
      `SELECT * FROM ${tableName} WHERE email = ?`,
      [email]
    );
    return rows.length > 0 ? (rows[0] as T) : null;
  },

  async create<T extends RowDataPacket[]>(
    tableName: string,
    data: object
  ): Promise<T> {
    const connPool = await getPool();
    const [result] = await connPool.query<T>(
      `INSERT INTO ${tableName} SET ?`,
      data
    );
    return result;
  },

  async update<T extends RowDataPacket[]>(
    tableName: string,
    id: string,
    data: object
  ): Promise<T> {
    const connPool = await getPool();
    const [result] = await connPool.query<T>(
      `UPDATE ${tableName} SET ? WHERE id = ?`,
      [data, id]
    );
    return result;
  },

  async delete<T extends RowDataPacket[]>(
    tableName: string,
    id: string
  ): Promise<T> {
    const connPool = await getPool();
    const [result] = await connPool.query<T>(
      `DELETE FROM ${tableName} WHERE id = ?`,
      id
    );
    return result;
  },

  async textSearch<T extends RowDataPacket[]>(
    tableName: string,
    params: TextSearchParams
  ): Promise<T> {
    const connPool = await getPool();
    const sql = `
      SELECT *
      FROM ${tableName}
      WHERE MATCH (columnName) AGAINST (? IN BOOLEAN MODE)
      LIMIT ? OFFSET ?
    `;
    // Note: Replace 'columnName' with the actual column you want to search against.
    const [rows] = await connPool.query<T>(sql, [
      params.searchTerm,
      params.pageSize,
      params.offset,
    ]);
    return rows;
  },

  async executeQuery<T extends RowDataPacket[]>(
    sql: string,
    params: Array<string | number> = []
  ): Promise<T> {
    const connPool = await getPool();
    try {
      const [rows] = await connPool.query<T>(sql, params);
      return rows;
    } catch (error) {
      // Error logging or handling can be improved here.
      console.error("Error executing custom query:", error);
      throw new Error("Error executing custom query");
    }
  },
};
// export const db = (tableName: string) => {
//   const getOne = async (id: string) => {
//     try {
//       const connection = await connectWithRetry();
//       const [rows] = await connection.query(
//         `SELECT * FROM ${tableName} WHERE id = ?`,
//         [id]
//       );
//       connection.release();
//       if (!rows) {
//         return null;
//       }
//       return rows;
//     } catch (error: any) {
//       console.log(`Error getting ${tableName} from DB: `, error);
//       throw error;
//     }
//   };
// const getByEmail = async (email: string) => {
//   try {
//     const connection = await connectWithRetry();
//     const [rows] = await connection.query(
//       `SELECT * FROM ${tableName} WHERE email = ?`,
//       [email]
//     );
//     connection.release();
//     if (!rows) {
//       return null;
//     }
//     return rows;
//   } catch (error: any) {
//     console.log(`Error getting ${tableName} from DB: `, error);
//     throw error;
//   }
// };

// const create = async (data: any) => {
//   try {
//     const connection = await connectWithRetry();
//     const [rows] = await connection.query(`INSERT INTO ${tableName} SET ?`, [
//       data,
//     ]);
//     connection.release();
//     if (!rows) {
//       return null;
//     }
//     return rows;
//   } catch (error: any) {
//     console.log(`Error saving ${tableName} to DB: `, error);
//     return null;
//   }
// };

// const textSearch = async (params: TextSearchParams) => {
//   const connection = await connectWithRetry();
//   const sql = `
//     SELECT *
//     FROM ${tableName}
//     WHERE MATCH (${params.searchTerm}) AGAINST (:searchTerm IN BOOLEAN MODE)
//     LIMIT :pageSize OFFSET :offset
//   `;

//   const [rows] = await connection.query(sql, params);
//   return rows;
// };

// return {
//   getOne,
//   create,
//   getByEmail,
//   textSearch,
// };
// };
