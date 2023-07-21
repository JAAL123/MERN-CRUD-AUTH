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

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null)

  const signup = async (user) => {
    const res = await registerRequest(user);
    setUser(res);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};