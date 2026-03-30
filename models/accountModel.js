import db from "./db.js";

export async function createUser(name, email, password) {
  const sql = `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING id, name, email, created_at
  `;

  const result = await db.query(sql, [name, email, password]);
  return result.rows[0];
}

export async function getUserByEmail(email) {
  const sql = `
    SELECT id, name, email, password, created_at
    FROM users
    WHERE email = $1
  `;

  const result = await db.query(sql, [email]);
  return result.rows[0];
}