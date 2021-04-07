import express from "express";
import userRoutes from "./src/user/userController";

const api = express();

api.use(express.json());
api.use("/api/users", userRoutes);

export default api;
