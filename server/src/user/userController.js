import { Router } from "express";
import * as userService from "./userService";

const router = new Router();

router.get("/", async (req, res) => {
  const users = await userService.listUsers();
  res.status(200).json(users);
});

router.get("/:username", async (req, res) => {
  const { username } = req.body;
  const user = await userService.listUniqueUser(username);
  res.status(200).json(user);
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const user = req.body;
  const { username } = await userService.saveUser(user);
  res.status(201).json(username);
});

export default router;
