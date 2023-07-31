import { useForm } from "react-hook-form";
import { UseTask } from "../context/TasksContex";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

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
      }
    }
    loadTask();
  }, []);

  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      updateTask(params.id, data);
    } else {
      createTask(data);
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
          <textarea
            rows="3"
            placeholder="Descripcion"
            {...register("description")}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          ></textarea>
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
        </form>
      </div>
    </div>
  );
}
