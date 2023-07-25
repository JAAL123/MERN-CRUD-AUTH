import { createContext, useContext, useState } from "react";
import { registerRequest } from "../api/auth";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState(null);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      setUser(res);
      setIsAuthenticated(true);
      console.log(res);
    } catch (error) {
      if (error.response.status === 400) setErrors(error.response.data);
      else if (error.response.status === 422)
        setErrors(error.response.data.message);
      else console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        errors,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
