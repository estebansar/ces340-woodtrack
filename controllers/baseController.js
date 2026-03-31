import bcrypt from "bcrypt";
import { createUser, getUserByEmail } from "../models/accountModel.js";


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

export function buildDashboard(req, res) {
  res.render("dashboard", {
    title: "Dashboard",
    user: req.session.user,
  });
}

/* Form action: login */
export async function loginAccount(req, res) {
  try {
    const { email, password } = req.body;
    const account = await getUserByEmail(email);

    if (!account) {
      return res.status(400).send("Invalid login.");
    }

    const passwordMatch = await bcrypt.compare(password, account.password);

    if (!passwordMatch) {
      return res.status(400).send("Invalid login.");
    }

    console.log("Session before save:", req.session);

    req.session.user = {
      id: account.id,
      name: account.name,
      email: account.email,
      role: account.email,
    };

    res.redirect("/dashboard");
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).send("Sorry, login failed.");
  }
}

export function buildAdmin(req, res) {
  res.render("admin", {
    title: "Admin Dashboard",
    user: req.session.user,
  });
}

/* Form action: register */
export async function registerAccount(req, res) {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser(name, email, hashedPassword);

    res.send(`Account created for ${newUser.name} with role ${newUser.email}`);
  } catch (error) {
    console.error("Register error:", error.message);
    res.status(500).send("Sorry, registration failed.");
  }
}

