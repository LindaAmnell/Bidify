import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <div className="navbar-top">
        <h1 className="logo">Bidify</h1>

        <button className="burger" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
      </div>

      <nav className={`nav-links ${isOpen ? "open" : ""}`}>
        <NavLink
          to="/"
          end
          onClick={() => setIsOpen(false)}
          className={({ isActive }) => (isActive ? "active" : "")}>
          Auctions
        </NavLink>
        {isAuthenticated && (
          <NavLink
            to="/myAuction"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => (isActive ? "active" : "")}>
            My auctions
          </NavLink>
        )}
        {!isAuthenticated && (
          <NavLink
            to="/login"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => (isActive ? "active" : "")}>
            Login
          </NavLink>
        )}
        {isAuthenticated && (
          <NavLink
            to="/profile"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => (isActive ? "active" : "")}>
            Profile
          </NavLink>
        )}
        {user?.role === "Admin" && (
          <NavLink
            to="/admin"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => (isActive ? "active" : "")}>
            Admin
          </NavLink>
        )}
        {isAuthenticated && (
          <NavLink
            to="/"
            onClick={() => {
              logout();
              navigate("/");
              setIsOpen(false);
            }}
            className="mobile-logout">
            Logout
          </NavLink>
        )}
      </nav>

      {isAuthenticated && (
        <div className="nav-right">
          <button
            className="logout-btn"
            onClick={() => {
              logout();
              navigate("/");
              setIsOpen(false);
            }}>
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
