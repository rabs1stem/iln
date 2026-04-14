const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: 'iln',
  password: 'postgres',
  port: 5432,
});

module.exports = pool;