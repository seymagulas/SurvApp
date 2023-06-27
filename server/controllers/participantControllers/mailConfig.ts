"use strict";

import dotenv from "dotenv";

dotenv.config();

const MAIL_SERVICE = process.env.MAIL_SERVICE || "Gmail";
const MAIL_USER = process.env.MAIL_USER || "surv4pp@gmail.com";
const MAIL_PASS = process.env.MAIL_PASS || "secret_key";

export const config = {
  mailService: MAIL_SERVICE,
  mailUser: MAIL_USER,
  mailPass: MAIL_PASS,
};
