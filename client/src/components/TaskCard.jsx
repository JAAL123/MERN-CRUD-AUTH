import { UseTask } from "../context/TasksContex";
import { Link } from "react-router-dom";

export function TaskCard({ task }) {
  const { deleteTask } = UseTask();
  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md ">
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold capitalize">{task.title}</h1>
        <div className="flex gap-x-2 items-center">
          <button
            className="border bg-green-700 border-inherit rounded py-2 px-1 hover:bg-green-600"
            onClick={() => {
              deleteTask(task._id);
            }}
          >
            Eliminar
          </button>
          <Link className="hover:text-sky-600" to={`/task/${task._id}`}>Editar</Link>
        </div>
      </header>
      <p className="text-slate-300">{task.description}</p>
      <p className="text-slate-300">
        {new Date(task.date).toLocaleDateString()}
      </p>
    </div>
  );
}
