import express from "express";
import staticRoutes from "./routes/static.js";

const app = express();

const PORT = 3000;

/* Setup: view engine */
app.set("view engine", "ejs");

/* Setup: static files (CSS, images, etc.) */
app.use(express.static("public"));

/* Routes */
app.use("/", staticRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});