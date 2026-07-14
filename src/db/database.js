const { Pool } = require("pg");
require("dotenv").config();

const database = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  max: process.env.DB_MAX_CLIENTS || 10,
  idleTimeoutMillis: process.env.DB_IDLE_TIMEOUT || 30000,
});

database.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
});

module.exports = database;
