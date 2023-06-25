"use strict";

import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { UserModel } from "../../models/userModel";
import { RegisterRequestProps } from "./interfaces";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, confirmPassword } =
      req.body as RegisterRequestProps;
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(422).send({
        message: "Please make sure the correct email address is entered.",
      });
    }

    if (password.trim() === "") {
      return res.status(422).send({
        message: "Password cannot be empty.",
      });
    }

    if (password !== confirmPassword) {
      return res.status(422).send({
        message: "Password and confirm password do not match.",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await UserModel.create({
      email,
      name,
      password: hashedPassword,
    });
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server error" });
  }
};
