import axios from "./axios";

export const getTaskRequest = () => axios.get("/tasks");

export const createTaskRequest = (task) => axios.post("/task", task);

export const getTaskByIdRequest = (id) => axios.get(`/tasks/${id}`);

export const updateTaskRequest = (task) =>
  axios.put(`/tasks/${task._id}`, task);

export const deleteTaskRequest = (id) => axios.delete(`/task/${id}`);
