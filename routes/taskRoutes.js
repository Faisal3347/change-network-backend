import express from 'express';
import {
  createTask,
  getTasks,
  updateStatus,
  deleteTask
} from '../controllers/taskController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); 

router.post('/', createTask);
router.get('/', getTasks);
router.patch('/:id/status', updateStatus);
router.delete('/:id', deleteTask);

export default router;
