require("dotenv").config();
import http from "http";
import mongoose from "mongoose";
import app from "./app";

const port = process.env.PORT || 3000;
const server = http.createServer(app);

(async () => {
  mongoose.set("useCreateIndex", true);
  await mongoose.connect(process.env.DB_URI, {
    useUnifiedTopology: true,
  });
  console.log("💿 Database successfully connected!");

  server.listen(port, () => {
    console.log(`🚀 API running on http://localhost:${port}`);
  });
})();
