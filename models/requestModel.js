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

// GET all requests for one user
export async function getRequestsByUserId(user_id) {
  try {
    const sql = `
      SELECT request_id, request_title, request_description, request_status, created_at
      FROM requests
      WHERE user_id = $1
      ORDER BY created_at DESC
    `

    const result = await db.query(sql, [user_id])
    return result.rows
  } catch (error) {
    console.error("getRequestsByUserId error:", error)
    throw error
  }
}