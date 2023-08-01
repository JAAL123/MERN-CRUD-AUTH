import { UseTask } from "../context/TasksContex";
import { useNavigate } from "react-router-dom";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";

dayjs.extend(utc);

export function TaskCard({ task }) {
  const { deleteTask } = UseTask();

  const navigate = useNavigate();

  return (
    <>
      <div className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
        <h5 className="mb-2 text-xl first-letter:capitalize  font-medium leading-tight text-neutral-800 dark:text-neutral-50">
          {task.title}
        </h5>
        <p className="mb-4 text-base text-neutral-200 first-letter:capitalize">
          {task.description}
        </p>
        <p className="text-slate-300 mb-4 text-base">
          {dayjs(task.date).utc().format("DD/MM/YYYY")}
        </p>
        <div className="flex mt-auto border-t-2 border-neutral-600 px-6 py-3 text-left gap-3 ">
          <button
            type="button"
            className="inline-block rounded bg-red-500 px-4 pb-2 pt-2.5 text-sm font-medium capitalize leading-normal text-white border hover:bg-red-600 "
            data-te-ripple-init
            data-te-ripple-color="light"
            onClick={() => {
              deleteTask(task._id);
            }}
          >
            Eliminar
          </button>
          <button
            type="button"
            className="inline-block rounded bg-yellow-500 px-4 pb-2 pt-2.5 text-sm font-medium capitalize leading-normal text-white border hover:bg-yellow-600 "
            data-te-ripple-init
            data-te-ripple-color="light"
            onClick={() => {
              navigate(`/task/${task._id}`);
            }}
          >
            Editar
          </button>
        </div>
      </div>
    </>
  );
}
