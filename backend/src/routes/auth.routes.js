import express from "express";
const router = express.Router();
import { signup, login, logout, checkauth } from "../controllers/auth.controller.js";

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/checkauth", checkauth);

export default router;
