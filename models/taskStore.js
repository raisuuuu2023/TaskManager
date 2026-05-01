const { v4: uuidv4 } = require('uuid');

let tasks = [];

const VALID_STATUSES = ['To Do', 'In Progress', 'Completed'];

function getAllTasks({ status, search, sort } = {}) {
  let result = [...tasks];

  if (status && VALID_STATUSES.includes(status)) {
    result = result.filter(t => t.status === status);
  }

  if (search && search.trim()) {
    const q = search.trim().toLowerCase();
    result = result.filter(
      t =>
        t.title.toLowerCase().includes(q) ||
        (t.description && t.description.toLowerCase().includes(q))
    );
  }

  if (sort === 'title_asc') result.sort((a, b) => a.title.localeCompare(b.title));
  else if (sort === 'title_desc') result.sort((a, b) => b.title.localeCompare(a.title));
  else if (sort === 'oldest') result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  else result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return result;
}

function getTaskById(id) {
  return tasks.find(t => t.id === id) || null;
}

function createTask({ title, description = '', status = 'To Do' }) {
  if (!title || !title.trim()) throw new Error('Title is required.');
  if (!VALID_STATUSES.includes(status))
    throw new Error(`Status must be one of: ${VALID_STATUSES.join(', ')}.`);

  const task = {
    id: uuidv4(),
    title: title.trim(),
    description: description.trim(),
    status,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  tasks.push(task);
  return task;
}

function updateTask(id, { title, description, status }) {
  const task = tasks.find(t => t.id === id);
  if (!task) return null;

  if (title !== undefined) {
    if (!title.trim()) throw new Error('Title cannot be empty.');
    task.title = title.trim();
  }
  if (description !== undefined) task.description = description.trim();
  if (status !== undefined) {
    if (!VALID_STATUSES.includes(status))
      throw new Error(`Status must be one of: ${VALID_STATUSES.join(', ')}.`);
    task.status = status;
  }
  task.updatedAt = new Date().toISOString();
  return task;
}

function deleteTask(id) {
  const idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) return false;
  tasks.splice(idx, 1);
  return true;
}

function getStats() {
  return {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'To Do').length,
    inProgress: tasks.filter(t => t.status === 'In Progress').length,
    completed: tasks.filter(t => t.status === 'Completed').length,
  };
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getStats,
  VALID_STATUSES,
};