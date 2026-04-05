import bcrypt from "bcrypt";
import {
  createUser,
  getUserByEmail,
  getUserById,
  updateUserAccount,
  getAllUsers,
  adminUpdateUser,
  deleteUserById
 } from "../models/accountModel.js";

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
  res.render("register", {
    title: "Register",
    errorMessage: null,
    formData: null
  });
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
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).render("register", {
        title: "Register",
        errorMessage: "Passwords do not match.",
        formData: { name, email }
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser(name, email, hashedPassword);

    res.redirect("/login");
  } catch (error) {
    console.error("Register error:", error.message);

    res.status(500).render("register", {
      title: "Register",
      errorMessage: "Sorry, registration failed.",
      formData: {
        name: req.body.name || "",
        email: req.body.email || ""
      }
    });
  }
}

export function logoutAccount(req, res) {
  req.session.destroy((error) => {
    if (error) {
      console.error("Logout error:", error.message);
      return res.status(500).send("Sorry, logout failed.");
    }

    res.clearCookie("connect.sid");
    res.redirect("/");
  });
}

export async function buildEditAccount(req, res) {
  try {
    const userId = req.session.user.id;
    const account = await getUserById(userId);

    res.render("edit-account", {
      title: "Edit Account",
      user: req.session.user,
      account
    });
  } catch (error) {
    console.error("Edit account page error:", error.message);
    res.status(500).send("Sorry, edit account page failed to load.");
  }
}

export async function updateAccount(req, res) {
  try {
    const userId = req.session.user.id;
    const { name, email } = req.body;

    const updatedUser = await updateUserAccount(userId, name, email);

    req.session.user = {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    };

    res.redirect("/dashboard");
  } catch (error) {
    console.error("Update account error:", error.message);
    res.status(500).send("Sorry, account update failed.");
  }
}

export async function buildUsers(req, res) {
  try {
    const users = await getAllUsers();

    res.render("admin-users", {
      title: "Manage Users",
      user: req.session.user,
      users,
    });
  } catch (error) {
    console.error("Users page error:", error.message);
    res.status(500).send("Sorry, users page failed to load.");
  }
}

export async function buildEditUser(req, res) {
  try {
    const userId = req.params.id;
    const account = await getUserById(userId);

    res.render("edit-user", {
      title: "Edit User",
      user: req.session.user,
      account,
    });
  } catch (error) {
    console.error("Edit user page error:", error.message);
    res.status(500).send("Sorry, edit user failed.");
  }
}

export async function adminUpdateUserAccount(req, res) {
  try {
    const { id, name, email, role } = req.body;

    await adminUpdateUser(id, name, email, role);

    res.redirect("/admin/users");
  } catch (error) {
    console.error("Admin update user error:", error.message);
    res.status(500).send("Sorry, user update failed.");
  }
}

export async function deleteUserAccount(req, res) {
  try {
    const { id } = req.body;

    await deleteUserById(id);

    res.redirect("/admin/users");
  } catch (error) {
    console.error("Delete user error:", error.message);
    res.status(500).send("Sorry, user delete failed.");
  }
}