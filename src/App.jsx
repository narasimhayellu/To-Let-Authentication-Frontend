import Header from "./Header";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login/Login";
import Register from "./Register/Register";
import ForgotPass from "./ForgotPass/ForgotPass";
import ResetPassword from "./reset-password";

function App() {
  return (
    <>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPass />} />
          <Route path="/reset-password/" element={<ResetPassword />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
