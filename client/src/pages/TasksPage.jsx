import { useEffect } from "react";
import { useAuth } from "../context/AuthContex";
import { UseTask } from "../context/TasksContex";

export function TasksPage() {
  const { user } = useAuth();
  console.log(user);
  const { getTasks, tasks } = UseTask();

  useEffect(() => {
    getTasks();
  }, []);

  if(tasks.length === 0) return (<p>No hay tareas</p>)

  return (
    <>
      {tasks.map((task) => (
        <div key={task._id}>
          <h1>{task.title}</h1>
          <p>{task.description}</p>
        </div>
      ))}
    </>
  );
}
