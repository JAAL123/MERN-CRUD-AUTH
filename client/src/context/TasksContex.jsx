import { createContext, useContext, useState } from "react";
import {
  createTaskRequest,
  deleteTaskRequest,
  getTaskRequest,
  getTaskByIdRequest,
  updateTaskRequest,
} from "../api/task";

const TaskContext = createContext();

export const UseTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
};

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    const res = await getTaskRequest();
    try {
      setTasks(res.data);
    } catch (error) {
      console.log(res);
    }
  };

  const createTask = async (task) => {
    const res = await createTaskRequest(task);
    console.log(res);
  };

  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskRequest(id);
      if (res.status === 204) setTasks(tasks.filter((task) => task._id !== id));
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTaskById = async (id) => {
    try {
      const res = await getTaskByIdRequest(id);
      return res.data;
    } catch (error) {}
  };

  const updateTask = async (id, task) => {
    try {
      const res = await updateTaskRequest(id, task);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        getTasks,
        deleteTask,
        getTaskById,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
