"use strict";

import { Request, Response } from "express";
import { UserState } from "./interfaces";

export const userDetails = async (req: Request, res: Response) => {
  try {
    const { _id, name, email } = req.app.locals.user as UserState;
    res.status(200).send({ _id, name, email });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server error" });
  }
};
