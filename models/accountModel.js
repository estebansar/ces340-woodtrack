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