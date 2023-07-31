import { useForm } from "react-hook-form";
import { UseTask } from "../context/TasksContex";
import { useNavigate } from "react-router-dom";

export function TasksFormPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { createTask } = UseTask();

  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    createTask(data);
    reset();
    navigate("/tasks");
  });

  const onClick = () => {
    navigate("/tasks");
  };

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center ">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <h1 className="text-center text-2xl font-bold my-2">Agregar Tarea</h1>

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
