import { config } from "dotenv";
import http from "http";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import Voiceet from "./dataModel.mjs";

config();
const port = process.env.PORT || 3000;
const dbUri = process.env.DB_URI || "mongodb://localhost:27017/mern_db";

const api = express();
const server = http.createServer(api);

api.use(cors());
api.use(express.json());

api.get("/", (req, res) => {
  res.json({ data: "Hello API!" });
});
api.get("/voiceets", async (req, res) => {
  const voiceets = await Voiceet.find({});
  res.json({ voiceets });
});
api.get("/voiceet/:id", async (req, res) => {
  const { id } = req.params;
  const voiceet = await Voiceet.findById(id);
  res.json({ voiceet });
});
api.post("/voiceet", async (req, res) => {
  const { user, audio } = req.body;
  const data = new Voiceet({ user, audio });
  const voiceet = await data.save();
  res.status(201).json({ message: "Success! Voice sended!", voiceet });
});

mongoose
  .connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("💽 DB is running and the connection is established");
    return server.listen(port);
  })
  .then(() => {
    console.log(`🚀 API Running on http://localhost:${port}`);
  })
  .catch((err) => console.error(err.message));
