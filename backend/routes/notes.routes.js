import { Router } from "express";
import db from "../db/db.js";
import {
  deleteNote,
  getNote,
  getNotes,
  postNote,
  putNote,
} from "../controllers/notes.controller.js";

const router = Router();

router.get("/notes/:id", getNotes);
router.get("/note/:id", getNote);
router.post("/notes", postNote);
router.put("/note/:id", putNote);
router.delete("/notes/:id", deleteNote);
export default router;
