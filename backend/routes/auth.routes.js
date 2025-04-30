import express from "express";
import { signupController, signinController } from "../controller/auth.controller.js";

const router = express.Router()

router.post("/signup", signupController)
router.post("/login", signinController)

export default router;