import { useAuth } from "./context/AuthContex";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoutes() {
  const { loading, isAuthenticated } = useAuth();

  if (loading) return <h1>Cargando...</h1>
  if (!loading && !isAuthenticated) return <Navigate to="/login" replace />;
  return (
    <>
      <Outlet />
    </>
  );
}
