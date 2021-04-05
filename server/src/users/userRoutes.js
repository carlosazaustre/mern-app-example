import { Router } from "express";
import { getUsers, getUser, saveUser } from "./userService";

const router = Router();

router.get("/", (req, res) => {});

router.get("/:username", (req, res) => {});

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const data = await saveUser(req.body);
    console.log(data);
    res.json({ data: data });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

export default router;
