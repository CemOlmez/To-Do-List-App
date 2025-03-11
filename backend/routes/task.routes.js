import express from "express";
import { protectRoute } from "../middleware/protectRoute.js"
import { createTasks, getAllTasks, updateTasks, deleteTasks     
 } from "../controllers/task.controller.js"

const router = express.Router();


router.post("/", protectRoute, createTasks)
router.get("/", protectRoute, getAllTasks)
router.put("/:id", protectRoute, updateTasks)
router.delete("/:id", protectRoute, deleteTasks)

export default router;