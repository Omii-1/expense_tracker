import express from "express";
import { signupController, signinController, checkCookies } from "../controller/auth.controller.js";

const router = express.Router()

router.post("/signup", signupController)
router.post("/signin", signinController)
router.get("/check", checkCookies)

export default router;