import { Router } from "express";
import db from "../db/db.js";
import {
  deleteUser,
  getUser,
  getUsers,
  login,
  postUser,
  putUser,
} from "../controllers/users.controller.js";

const router = Router();

router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.post("/register", postUser);
router.put("/users/:id", putUser);
router.delete("/users/:id", deleteUser);
router.post("/login", login);
export default router;
