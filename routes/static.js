import express from "express";
import {
  buildHome,
  buildProjects,
  buildRequests,
  buildLogin,
  buildRegister
} from "../controllers/baseController.js";

const router = express.Router();

router.get("/", buildHome);
router.get("/projects", buildProjects);
router.get("/requests", buildRequests);
router.get("/login", buildLogin);
router.get("/register", buildRegister);

export default router;