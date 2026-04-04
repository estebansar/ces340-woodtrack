import "dotenv/config";
import db from "../models/db.js";

async function makeAdmin() {
  try {
    const result = await db.query(
      "UPDATE users SET role = 'admin' WHERE email = $1 RETURNING *",
      ["test2@test.com"] // your user
    );

    console.log("Updated user:", result.rows[0]);
    process.exit(0);
  } catch (error) {
    console.error("Error updating user:", error.message);
    process.exit(1);
  }
}

makeAdmin();