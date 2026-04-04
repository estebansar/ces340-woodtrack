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
    SELECT id, name, email, password, role, created_at
    FROM users
    WHERE email = $1
  `;

  const result = await db.query(sql, [email]);
  return result.rows[0];
}

export async function getUserById(id) {
  const sql = `
    SELECT id, name, email, role, created_at
    FROM users
    WHERE id = $1
  `;

  const result = await db.query(sql, [id]);
  return result.rows[0];
}

export async function updateUserAccount(id, name, email) {
  const sql = `
    UPDATE users
    SET name = $1, email = $2
    WHERE id = $3
    RETURNING id, name, email, role, created_at
  `;

  const result = await db.query(sql, [name, email, id]);
  return result.rows[0];
}
