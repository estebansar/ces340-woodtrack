import express from "express";
import {
  buildHome,
  buildProjects,
  buildRequests,
  buildLogin,
  buildRegister,
  buildDashboard,
  buildAdmin,
  loginAccount,
  registerAccount
} from "../controllers/baseController.js";
import { checkLogin, checkAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", buildHome);
router.get("/projects", buildProjects);
router.get("/requests", buildRequests);
router.get("/login", buildLogin);
router.get("/register", buildRegister);
router.get("/dashboard", checkLogin, buildDashboard);
router.get("/admin", checkAdmin, buildAdmin);

router.post("/login", loginAccount);
router.post("/register", registerAccount);

export default router;