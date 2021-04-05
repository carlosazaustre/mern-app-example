import express from "express";
import userRoutes from "./src/users/userRoutes";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/users", userRoutes);

export default app;
