import "dotenv/config";
import db from "../models/db.js";

async function addUserRoleColumn() {
  try {
    const sql = `
      ALTER TABLE users
      ADD COLUMN IF NOT EXISTS role VARCHAR(20) NOT NULL DEFAULT 'client';
    `;

    await db.query(sql);

    console.log("Role column added successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error adding role column:", error.message);
    process.exit(1);
  }
}

addUserRoleColumn();