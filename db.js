// db.js
const dotenv = require('dotenv');
dotenv.config();
const { Pool } = require('pg');

// Use DATABASE_URL from environment (Render or local)
const connectionString = process.env.DATABASE_URL || process.env.DBConnectionString;

// Create a new pool
const pool = new Pool({
  connectionString,
  ssl: connectionString && connectionString.includes('render.com') 
       ? { rejectUnauthorized: false } 
       : false,  // no SSL for local
});

// Optional: export a query helper
module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
};