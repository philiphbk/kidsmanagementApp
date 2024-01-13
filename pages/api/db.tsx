// db.ts
import { createPool, Pool } from 'mysql2/promise';

const pool: Pool = createPool({
  host: 'your-mysql-host',
  user: 'your-mysql-username',
  password: 'your-mysql-password',
  database: 'your-database-name',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
