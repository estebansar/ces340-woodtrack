import express from "express";
import {
  buildHome,
  buildProjects,
  buildRequests,
  buildLogin,
  buildRegister,
  loginAccount,
  registerAccount
} from "../controllers/baseController.js";

const router = express.Router();

router.get("/", buildHome);
router.get("/projects", buildProjects);
router.get("/requests", buildRequests);
router.get("/login", buildLogin);
router.get("/register", buildRegister);
router.post("/login", loginAccount);
router.post("/register", registerAccount);

export default router;