import express from "express";
import { changePassword, forgotPassword, login, logout, myProfile, register, resendEmail, verifyEmail } from "../controller/authController.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/resend-email", resendEmail);
authRouter.post("/forgot-password", forgotPassword);
authRouter.get("/profile", myProfile);
authRouter.post("/verify-email", verifyEmail);
authRouter.post("/change-password", changePassword);

export default authRouter;