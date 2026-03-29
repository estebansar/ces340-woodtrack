import "dotenv/config";
import express from "express";
import staticRoutes from "./routes/static.js";
import db from "./models/db.js";

const app = express();

const PORT = 3000;

/* Setup: view engine */
app.set("view engine", "ejs");

/* Setup: static files (CSS, images, etc.) */
app.use(express.static("public"));

/* Setup: form data */
app.use(express.urlencoded({ extended: true }));

/* Test DB connection */
(async () => {
  try {
    const result = await db.query("SELECT NOW()");
    console.log("Database connected:", result.rows[0]);
  } catch (error) {
    console.error("Database error:", error.message);
  }
})();

/* Routes */
app.use("/", staticRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});