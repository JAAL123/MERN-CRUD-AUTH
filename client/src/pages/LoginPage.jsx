import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContex";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const { singin, errors: loginErrors, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tasks");
    }
    else{
      return navigate("/login")      
    }
  }, [isAuthenticated]);

  const onSubmit = handleSubmit((data) => {
    singin(data);
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center ">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <h1 className="text-center text-2xl font-bold">Inicio de Sesión</h1>
        {loginErrors && (
          <div className="bg-red-500 p-2 text-white">{loginErrors} </div>
        )}
        <form action="" onSubmit={onSubmit}>
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
            Iniciar Sesión
          </button>
        </form>
        <p className="flex gap-x-2 justify-center my-2">
          ¿No tienes una cuenta?,{" "}
          <Link to="/register" className="text-sky-700 hover:text-sky-500">
            Registrate
          </Link>
        </p>
      </div>
    </div>
  );
}
