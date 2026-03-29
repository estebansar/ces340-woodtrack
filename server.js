import express from "express";

const app = express();

const PORT = 3000;

/* Setup: view engine */
app.set("view engine", "ejs");

/* Setup: static files (CSS, images, etc.) */
app.use(express.static("public"));

/* Route: Home page */
app.get("/", (req, res) => {
  res.render("index", { title: "Home" }); 
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});