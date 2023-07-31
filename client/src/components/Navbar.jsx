import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContex";

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  return (
    <>
      <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
        <Link to="/">
          <h1 className="text-base font-bold">Administrador de Tareas</h1>
        </Link>
        <ul className="flex gap-x-2">
          {isAuthenticated ? (
            <>
              <li className="capitalize">{user?.username}</li>
              <li>
                <Link
                  to="/task/new"
                  className="bg-green-500 px-2 py-2 rounded-sm border hover:bg-green-600"
                >
                  Añadir Tarea
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  onClick={() => logout()}
                  className="hover:text-cyan-500"
                >
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="bg-indigo-500 px-4 py-2 rounded-sm border hover:bg-indigo-600"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="bg-indigo-500 px-4 py-2 rounded-sm border hover:bg-indigo-600"
                >
                  Registro
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}
