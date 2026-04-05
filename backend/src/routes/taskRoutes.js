const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { protect } = require('../middleware/auth');

router.get('/', protect, taskController.getAllTasks);
router.post('/', protect, taskController.createTask);
router.patch('/:id/complete', protect, taskController.markAsCompleted);
router.put('/:id', protect, taskController.editTask);
router.delete('/:id', protect, taskController.deleteTask);

module.exports = router;
