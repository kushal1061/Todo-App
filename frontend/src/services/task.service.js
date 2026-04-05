import api from './api';

const getAllTasks = async () => {
  const response = await api.get('/tasks');
  return response.data;
};

const createTask = async (taskData) => {
  const response = await api.post('/tasks', taskData);
  return response.data;
};

const updateTask = async (taskId, taskData) => {
  const response = await api.put(`/tasks/${taskId}`, taskData);
  return response.data;
};

const completeTask = async (taskId) => {
  const response = await api.patch(`/tasks/${taskId}/complete`);
  return response.data;
};

const deleteTask = async (taskId) => {
  const response = await api.delete(`/tasks/${taskId}`);
  return response.data;
};

const taskService = {
  getAllTasks,
  createTask,
  updateTask,
  completeTask,
  deleteTask,
};

export default taskService;
