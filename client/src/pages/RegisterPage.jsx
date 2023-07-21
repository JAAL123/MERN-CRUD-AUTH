import { useState } from "react";
import { useForm } from "react-hook-form";
import { registerRequest } from "../api/auth";

export function RegisterPage() {
  const { register, handleSubmit, reset } = useForm();
  // const [values, setValues] = useState({
  //   username: '',
  //   email: '',
  //   password: ''
  // })
  return (
    <div className="bg-zinc-800 max-w-md p-10 rounded-md content-center">
      <form
        action=""
        onSubmit={handleSubmit(async (values) => {
          const res = await registerRequest(values);
          console.log(res);
          // setValues(values)
          reset();
        })}
      >
        <input
          type="text"
          {...register("username", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md"
          placeholder="Usuario"
        />
        <input
          type="email"
          {...register("email", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md"
          placeholder="Correo"
        />
        <input
          type="password"
          {...register("password", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md"
          placeholder="Contraseña"
        />
        <button
          type="submit"
          className="border bg-zinc-700 border-inherit rounded p-2 hover:bg-zinc-600"
        >
          Registrar
        </button>
      </form>
    </div>
  );
}
