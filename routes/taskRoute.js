import express from 'express';
import { createTask, getTaskById, getTasks } from '../controllers/taskController.js';
const router = express.Router();
router.get('/',getTasks); // This is where i am injecting getTask from the controller.
router.get('/:id',getTaskById);
router.post('/',createTask);
export default router;