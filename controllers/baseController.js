export function buildHome(req, res) {
  res.render("index", { title: "Home" });
}

export function buildProjects(req, res) {
  res.send("Projects page coming soon");
}

export function buildRequests(req, res) {
  res.send("Requests page coming soon");
}

export function buildLogin(req, res) {
  res.send("Login page coming soon");
}

export function buildRegister(req, res) {
  res.send("Register page coming soon");
}