import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(
    JSON.parse(localStorage.getItem("isLogin") || "false")
  );

  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const login = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/users/login",
        formData
      );
      const { token, user } = response.data;
      localStorage.setItem("authToken", token);
      setUser(user);
      setIsLogin(true);
      localStorage.setItem("isLogin", JSON.stringify(true));
      enqueueSnackbar("Login successful!", { variant: "success" });
      navigate("/home");
    } catch (error) {
      enqueueSnackbar("Wrong email or password", { variant: "error" });
      console.log(error);
    }
  };

  const logout = () => {
    setIsLogin(false);
    localStorage.setItem("isLogin", JSON.stringify(false));
    setUser(null);
    navigate("/");
    enqueueSnackbar("logout successful", { variant: "success" });
    return true;
  };

  const register = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/users/register",
        formData
      );
      const { token, user } = response.data;
      localStorage.setItem("authToken", token);
      setUser(user);
      console.log(response.data);
      enqueueSnackbar("Signup successful!", { variant: "success" });
      navigate("/home");
    } catch (error) {
      console.error("Signup error:", error);
      enqueueSnackbar("Signup failed. Email might already be registered.", {
        variant: "error",
      });
    }
  };

  const forgotPassword = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/users/forgot-password",
        formData
      );
      enqueueSnackbar("Reset link sent to your email", { variant: "success" });
    } catch (error) {
      console.error("Forgot password error:", error);
      enqueueSnackbar("Failed to send reset link", { variant: "error" });
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLogin, setIsLogin, login, register, logout, forgotPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};
