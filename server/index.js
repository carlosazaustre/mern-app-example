require("dotenv").config();

import http from "http";
import api from "./api";
import db from "./db";

const port = process.env.PORT || 3000;
const dbUri = process.env.DB_URI || "mongodb://localhost:27017/mern_db";

const server = http.createServer(api);

db(dbUri)
  .then(() => {
    console.log("DB is running and the connection is established");

    server.listen(port, () => {
      console.log(`API Running on http://localhost:${port}`);
    });
  })
  .catch((err) => console.error(err.message));
