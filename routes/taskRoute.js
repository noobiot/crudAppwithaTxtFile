import express from 'express';
import { createTask, deleteTaskById, getTaskById, getTasks, updateTaskById } from '../controllers/taskController.js';
const router = express.Router();
router.get('/',getTasks); // This is where i am injecting getTask from the controller.
router.get('/:id',getTaskById);
router.post('/',createTask);
router.put('/:id',updateTaskById);
router.delete('/:id',deleteTaskById);
export default router;