"use strict";

import { Router } from "express";
import { login, register, userDetails } from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware";

export const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/user", authMiddleware, userDetails);
