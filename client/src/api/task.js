import axios from "./axios";

export const getTaskRequest = () => axios.get("/tasks");

export const createTaskRequest = (task) => axios.post("/task", task);

export const getTaskByIdRequest = (id) => axios.get(`/task/${id}`);

export const updateTaskRequest = (id,task) =>
  axios.put(`/task/${id}`, task);

export const deleteTaskRequest = (id) => axios.delete(`/task/${id}`);
