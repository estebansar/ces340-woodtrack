import bcrypt from "bcrypt";
import { createUser, getUserByEmail } from "../models/accountModel.js";
import { getRequestsByUserId, getAllRequests } from "../models/requestModel.js";


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

export async function buildDashboard(req, res) {
  try {
    const userId = req.session.user.id;
    const requests = await getRequestsByUserId(userId);

    res.render("dashboard", {
      title: "Dashboard",
      user: req.session.user,
      requests,
    });
  } catch (error) {
    console.error("Dashboard error:", error.message);
    res.status(500).send("Sorry, dashboard failed to load.");
  }
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
      role: account.role,
    };

    res.redirect("/dashboard");
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).send("Sorry, login failed.");
  }
}

export async function buildAdmin(req, res) {
  try {
    const requests = await getAllRequests();

    res.render("admin", {
      title: "Admin Dashboard",
      user: req.session.user,
      requests,
    });
  } catch (error) {
    console.error("Admin dashboard error:", error.message);
    res.status(500).send("Sorry, admin dashboard failed to load.");
  }
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

