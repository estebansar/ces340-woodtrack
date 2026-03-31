import db from './db.js'

// CREATE new request
export async function createRequest(user_id, title, description) {
  try {
    const sql = `
      INSERT INTO requests (request_title, request_description, user_id)
      VALUES ($1, $2, $3)
      RETURNING *
    `
    
    const result = await db.query(sql, [title, description, user_id])
    return result.rows[0]

  } catch (error) {
    console.error("createRequest error:", error)
    throw error
  }
}
