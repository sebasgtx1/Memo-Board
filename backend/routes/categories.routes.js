import { Router } from "express";
import {
  deleteCategory,
  getCategory,
  getCategories,
  postCategory,
  putCategory,
} from "../controllers/categories.controller.js";

const router = Router();

router.get("/categories", getCategories);
router.get("/category/:id", getCategory);
router.post("/categories", postCategory);
router.put("/categories/:id", putCategory);
router.delete("/categories/:id", deleteCategory);
export default router;
