import { createContext, useContext, useState } from "react";
import { createTaskRequest, getTaskRequest } from "../api/task";

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
      setTasks(res.data)
    } catch (error) {
      console.log(res)
    }
  };

  const createTask = async (task) => {
    const res = await createTaskRequest(task);
    console.log(res);
  };

  return (
    <TaskContext.Provider value={{ tasks, createTask, getTasks }}>
      {children}
    </TaskContext.Provider>
  );
}
