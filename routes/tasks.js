const express = require('express');
const router = express.Router();
const store = require('../models/taskStore');

router.get('/', (req, res) => {
  try {
    const { status, search, sort } = req.query;
    const tasks = store.getAllTasks({ status, search, sort });
    const stats = store.getStats();
    res.json({ success: true, count: tasks.length, stats, data: tasks });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get('/stats', (req, res) => {
  res.json({ success: true, data: store.getStats() });
});

router.get('/:id', (req, res) => {
  const task = store.getTaskById(req.params.id);
  if (!task) return res.status(404).json({ success: false, message: 'Task not found.' });
  res.json({ success: true, data: task });
});

router.post('/', (req, res) => {
  try {
    const task = store.createTask(req.body);
    res.status(201).json({ success: true, message: 'Task created.', data: task });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.put('/:id', (req, res) => {
  try {
    const task = store.updateTask(req.params.id, req.body);
    if (!task) return res.status(404).json({ success: false, message: 'Task not found.' });
    res.json({ success: true, message: 'Task updated.', data: task });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.patch('/:id', (req, res) => {
  try {
    const task = store.updateTask(req.params.id, req.body);
    if (!task) return res.status(404).json({ success: false, message: 'Task not found.' });
    res.json({ success: true, message: 'Task updated.', data: task });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.delete('/:id', (req, res) => {
  const deleted = store.deleteTask(req.params.id);
  if (!deleted) return res.status(404).json({ success: false, message: 'Task not found.' });
  res.json({ success: true, message: 'Task deleted.' });
});

module.exports = router;