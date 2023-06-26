"use strict";

import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { login } from "../controllers/authControllers/loginController";
import { userDetails } from "../controllers/authControllers/profileController";
import { register } from "../controllers/authControllers/registerController";

export const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/user", authMiddleware, userDetails);
