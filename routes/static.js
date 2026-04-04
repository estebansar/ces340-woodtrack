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
  registerAccount,
  logoutAccount,
  buildEditAccount,
  updateAccount
} from "../controllers/baseController.js";
import { checkLogin, checkAdmin } from "../middleware/authMiddleware.js";
import { submitRequest, changeRequestStatus } from "../controllers/requestController.js"


const router = express.Router();

router.get("/", buildHome);
router.get("/projects", buildProjects);
router.get("/requests", buildRequests);

router.post("/requests", checkLogin, submitRequest);

router.get("/login", buildLogin);
router.get("/register", buildRegister);
router.get("/logout", logoutAccount);
router.get("/dashboard", checkLogin, buildDashboard);
router.get("/account/edit", checkLogin, buildEditAccount);
router.post("/account/edit", checkLogin, updateAccount);
router.get("/admin", checkAdmin, buildAdmin);

router.post("/admin/requests/status", checkAdmin, changeRequestStatus);

router.post("/login", loginAccount);
router.post("/register", registerAccount);

export default router;