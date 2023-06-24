"use strict";

import mongoose, { ConnectOptions } from "mongoose";
import { config } from "./config";

const { dbName, dbHost, dbPort } = config;

mongoose
  .connect(`mongodb://${dbHost}:${dbPort}/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => {
    console.log("✅ MongoDB connection is successful");
  })
  .catch((error) => {
    console.error("❌ MongoDB connection failed:", error);
  });

export default mongoose;
