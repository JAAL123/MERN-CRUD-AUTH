import { useEffect } from "react";
import { UseTask } from "../context/TasksContex";
import { TaskCard } from "../components/TaskCard";

export function TasksPage() {
  const { getTasks, tasks } = UseTask();

  useEffect(() => {
    getTasks();
  }, []);

  if (tasks.length === 0) return <p>No hay tareas</p>;

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3" >
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
}
