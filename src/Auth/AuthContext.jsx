import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(
    JSON.parse(localStorage.getItem("isLogin") || "false")
  );

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const navigate = useNavigate();

  const login = async (formData) => {
    try {
      const response = await axios.post(
        "https://to-let-authentication-backend.onrender.com/users/login",
        formData
      );
      const { token, user } = response.data;
      
      if (!token || !user) {
        throw new Error("Invalid response from server");
      }
      
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      setIsLogin(true);
      localStorage.setItem("isLogin", JSON.stringify(true));
      enqueueSnackbar("Login successful!", { variant: "success" });
      navigate("/home");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Wrong email or password";
      enqueueSnackbar(errorMessage, { variant: "error" });
      console.error("Login error:", error);
    }
  };

  const logout = () => {
    setIsLogin(false);
    localStorage.setItem("isLogin", JSON.stringify(false));
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
    enqueueSnackbar("Logout successful", { variant: "success" });
    return true;
  };

  const register = async (formData) => {
    try {
      const response = await axios.post(
        "https://to-let-authentication-backend.onrender.com/users/register",
        formData
      );
      const { token, user } = response.data;
      
      if (!token || !user) {
        throw new Error("Invalid response from server");
      }
      
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      setIsLogin(true);
      localStorage.setItem("isLogin", JSON.stringify(true));
      enqueueSnackbar("Signup successful!", { variant: "success" });
      navigate("/home");
    } catch (error) {
      console.error("Signup error:", error);
      const errorMessage = error.response?.data?.message || "Signup failed. Email might already be registered.";
      enqueueSnackbar(errorMessage, {
        variant: "error",
      });
    }
  };

  const forgotPassword = async (formData) => {
    try {
      const response = await axios.post(
        "https://to-let-authentication-backend.onrender.com/users/forgot-password",
        formData
      );
      enqueueSnackbar("Reset link sent to your email", { variant: "success" });
      return response.data;
    } catch (error) {
      console.error("Forgot password error:", error);
      const errorMessage = error.response?.data?.message || "Failed to send reset link";
      enqueueSnackbar(errorMessage, { variant: "error" });
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLogin, user, login, register, logout, forgotPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};
