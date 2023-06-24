"use strict";

import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { UserModel } from "../models/userModel";
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY || "secret_key";

interface RegisterRequestProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

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

interface LoginRequestProps {
  email: string;
  password: string;
}

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

interface UserState {
  _id: string;
  name: string;
  email: string;
}

export const userDetails = async (req: Request, res: Response) => {
  try {
    const { _id, name, email } = req.app.locals.user as UserState;
    res.status(200).send({ _id, name, email });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server error" });
  }
};
