import { useForm } from "react-hook-form";
import { UseTask } from "../context/TasksContex";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
dayjs.extend(utc);

export function TasksFormPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  const { createTask, getTaskById, updateTask } = UseTask();

  const navigate = useNavigate();

  const params = useParams();

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTaskById(params.id);
        setValue("title", task.title);
        setValue("description", task.description);
        setValue("date", dayjs.utc(task.date).format('YYYY-MM-DD'))
      }
    }
    loadTask();
  }, []);

  const onSubmit = handleSubmit((data) => {
    const dataValid = {
      ...data,
      date: data.date ? dayjs.utc(data.date).format() : dayjs().utc().format(),
    };

    if (params.id) {
      updateTask(params.id, dataValid);
    } else {
      createTask(dataValid);
    }
    reset();
    navigate("/tasks");
  });

  const onClick = () => {
    navigate("/tasks");
  };

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center ">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <h1 className="text-center text-2xl font-bold my-2">
          {params?.id ? "Editar" : "Agregar"} Tarea
        </h1>

        <form action="" onSubmit={onSubmit}>
          <label htmlFor="title" className="text-base text-neutral-200">
            Titulo:
          </label>
          <input
            type="text"
            placeholder="Titulo"
            {...register("title", { required: true })}
            autoFocus
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />
          {errors.title && (
            <p className="text-red-600">El titulo es requerido</p>
          )}
          <label htmlFor="description" className="text-base text-neutral-200">
            Descripcion:
          </label>
          <textarea
            rows="3"
            placeholder="Descripcion"
            {...register("description")}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          ></textarea>
          <label htmlFor="date" className="text-base text-neutral-200">
            Fecha:
          </label>
          <input
            type="date"
            {...register("date")}
            className="bg-zinc-700 text-white my-2 mx-2 rounded-md p-1"
          />
          <div className="flex mt-auto my-2 border-t-2 border-neutral-600 px-6 py-3 text-left gap-2 justify-start">
            <button
              type="submit"
              className="border bg-green-700 border-inherit rounded p-2 mx-2 hover:bg-green-600"
            >
              Guardar
            </button>
            <button
              type="button"
              className="border bg-red-700 border-inherit rounded p-2 mx-2 hover:bg-red-600"
              onClick={onClick}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
