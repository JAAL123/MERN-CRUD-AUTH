import { createContext, useContext, useEffect, useState } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

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
  const [loading, setLoading] = useState(true);

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

  const singin = async (credentials) => {
    try {
      const res = await loginRequest(credentials);
      setUser(res);
      setIsAuthenticated(true);
      setErrors(null);
      console.log(res);
    } catch (error) {
      if (error.response.status === 400) {
        setErrors(error.response.data.message);
      }
      else{
        setErrors(error.response.data);
      } 
    }
  };

  useEffect(() => {
    if (errors !== null) {
      const timer = setTimeout(() => {
        setErrors(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return setUser(null);
        }
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        setUser(null);
      }
    }
    checkLogin();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        errors,
        loading,
        signup,
        singin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
