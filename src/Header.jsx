import { Link } from "react-router-dom";
import "./header.css";
import { useContext } from "react";
import { AuthContext } from "./Auth/AuthContext";

const Header = () => {
  const { isLogin, logout } = useContext(AuthContext);
  return (
    <div className="container">
      <header className="top">
        <Link to="/">
          <img
            className="logo ms-6 mt-2"
            src="https://www.toletglobe.in/assets/logo-ClaEJkU2.png"
            alt=""
          />
        </Link>
        <Link to="/" className="home">
          <button className="button w-15">Home</button>
        </Link>
        <Link to="/" className="about">
          <button className="button w-20">About Us</button>
        </Link>
        <Link to="/" className="blog">
          <button className="button w-13">Blog</button>
        </Link>
        <Link to="/" className="contact">
          <button className="button w-18">Contact</button>
        </Link>
        <Link to="/" className="prop">
          <button className="button w-33">Property Listing</button>
        </Link>
        {!isLogin && (
          <Link to="/login" className="log">
            <button className="button w-30">Login / Signup</button>
          </Link>
        )}
        {isLogin && (
          <button onClick={logout} className="logout button w-30">
            Logout
          </button>
        )}
      </header>
    </div>
  );
};

export default Header;
