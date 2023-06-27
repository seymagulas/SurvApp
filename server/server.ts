"use strict";

import dotenv from "dotenv";
import { app } from "./index";

dotenv.config();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server is listening on port: ${PORT}`));
