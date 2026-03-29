import bcrypt from "bcrypt";
import { createUser } from "../models/accountModel.js";


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

/* Form action: login */
export function loginAccount(req, res) {
  const { email } = req.body;
  res.send(`Login submitted for: ${email}`);
}

/* Form action: register */
export async function registerAccount(req, res) {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await createUser(name, email, hashedPassword);

      res.send(`Account created for ${newUser.name} with email ${newUser.email}`);
    } catch (error) {
      console.error("Register error:", error.message);
      res.status(500).send("Sorry, registration failed.");
  }
}