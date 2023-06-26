"use strict";

import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { UserModel } from "../../models/userModel";
import { LoginRequestProps } from "./interfaces";

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY || "secret_key";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as LoginRequestProps;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(422).send({
        message: "Username or password is not correct.",
      });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(422).send({
        message: "Username or password is not correct.",
      });
    }

    const accessToken = jwt.sign({ id: user._id }, SECRET_KEY);
    res.status(200).send({ accessToken });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server error" });
  }
};
