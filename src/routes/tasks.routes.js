import { Router } from "express";
import { authRequire } from "../middlewares/validateToken.js";
import {
  getTasks,
  createTask,
  deleteTask,
  getTaskByName,
  updateTask,
  getTaskById
} from "../controllers/tasks.controller.js";

const router = Router();

router.get("/tasks", authRequire, getTasks);
//router.get("/task/:name", authRequire, getTaskByName);
router.get("/task/:id", authRequire, getTaskById);
router.post("/task", authRequire, createTask);
router.put("/task/:id", authRequire, updateTask);
router.delete("/task/:id", authRequire, deleteTask);

export default router;
