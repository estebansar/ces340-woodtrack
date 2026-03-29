export function buildHome(req, res) {
  res.render("index", { title: "Home" });
}

export function buildProjects(req, res) {
  res.render("projects", { title: "Projects" });
}

export function buildRequests(req, res) {
  res.render("requests", { title: "Requests" });
}

export function buildLogin(req, res) {
  res.render("login", { title: "Login" });
}

export function buildRegister(req, res) {
  res.render("register", { title: "Register" });
}
