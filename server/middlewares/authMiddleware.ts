"use strict";

import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/userModel";
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || "secret_key";

interface TokenProps {
  id: number;
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeaders = req.headers["authorization"];
  if (!authHeaders) {
    return res.sendStatus(403);
  }

  try {
    const token = authHeaders.split(" ")[1].replace(/"/g, "");
    const { id } = jwt.verify(token, SECRET_KEY) as TokenProps;
    const user = await UserModel.findOne({ _id: id });

    if (!user) {
      throw new Error();
    }

    req.app.locals.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error, message: "Please authenticate" });
  }
};
