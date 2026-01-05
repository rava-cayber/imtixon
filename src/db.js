import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: '24856',
  database: 'Auto_sale',
  port: 5432
});

export default pool;

