const pool = require("../db/database");
const bcrypt = require("bcrypt");

async function findAll() {
  const result = await pool.query(
    "SELECT id, name, email, created_at FROM users ORDER BY id",
  );
  return result.rows;
}

async function findById(id) {
  const result = await pool.query('SELECT id, name, email, created_at FROM users WHERE id = $1', [id]);
  return result.rows[0] || null;
}

async function create({ name, email, password }) {
  console.log("Creating user:", { name, email, password });
  const passwordHash = await bcrypt.hash(password, 10);
  const result = await pool.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, created_at',
    [name, email, passwordHash]
  );
  return result.rows[0];
}

async function findByEmail(email) {
  const result = await pool.query('SELECT id, name, email, password FROM users WHERE email = $1', [email]);
  return result.rows[0] || null;
}

async function remove(id) {
  const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
  return result.rowCount > 0;
}

module.exports = { findAll, findById, create, remove, findByEmail };