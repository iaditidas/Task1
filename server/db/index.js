import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const poolConfig = process.env.DATABASE_URL
  ? { connectionString: process.env.DATABASE_URL }
  : {
      user: process.env.PGUSER || 'postgres',
      password: process.env.PGPASSWORD || 'postgres',
      host: process.env.PGHOST || 'localhost',
      port: parseInt(process.env.PGPORT || '5432', 10),
      database: process.env.PGDATABASE || 'portfolio_db'
    };

export const pool = new Pool(poolConfig);

let isDbConnected = false;

pool.on('connect', () => {
  isDbConnected = true;
});

pool.on('error', (err) => {
  console.error('Unexpected PostgreSQL pool error:', err.message);
});

export const query = async (text, params) => {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  // Silent log query timing in dev mode
  return res;
};

export const checkConnection = async () => {
  try {
    const client = await pool.connect();
    client.release();
    isDbConnected = true;
    return true;
  } catch (err) {
    isDbConnected = false;
    return false;
  }
};
