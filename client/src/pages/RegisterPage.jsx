import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContex";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export function RegisterPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: authErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tasks");
    }
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
    reset();
  });
  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md p-10 rounded-md ">
        {authErrors && (
          <div className="bg-red-500 p-2 text-white">{authErrors} </div>
        )}
        <form action="" onSubmit={onSubmit}>
          <input
            type="text"
            {...register("username", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md"
            placeholder="Usuario"
          />
          {errors.username && (
            <p className="text-red-600">El nombre de usuario es requerido</p>
          )}
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md"
            placeholder="Correo"
          />
          {errors.email && (
            <p className="text-red-600">El correo es requerido</p>
          )}
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md"
            placeholder="Contraseña"
          />
          {errors.password && (
            <p className="text-red-600">La contraseña es requerida</p>
          )}
          <button
            type="submit"
            className="border bg-zinc-700 border-inherit rounded p-2 hover:bg-zinc-600"
          >
            Registrar
          </button>
        </form>
        <p className="flex gap-x-2 justify-center my-2">
          ¿Ya tienes una cuenta?,{" "}
          <Link to="/login" className="text-sky-700 hover:text-sky-500">
            Inicia Sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
