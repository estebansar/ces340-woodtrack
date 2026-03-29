import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import db from "../models/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runSchema() {
  try {
    const schemaPath = path.join(__dirname, "schema.sql");
    console.log("Reading schema from:", schemaPath);
    const sql = fs.readFileSync(schemaPath, "utf8");
    console.log("Running SQL...");


    await db.query(sql);

    console.log("Users table created successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error running schema:", error.message);
    process.exit(1);
  }
}

runSchema();