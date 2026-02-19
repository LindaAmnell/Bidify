import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout, user } = useContext(AuthContext);

  return (
    <header className="navbar">
      <div className="navbar-top">
        <h1 className="logo">Bidify</h1>

        <button className="burger" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
      </div>

      <nav className={`nav-links ${isOpen ? "open" : ""}`}>
        <Link to="/">Auctions</Link>

        {isAuthenticated && <Link to="/myAuction">My auctions</Link>}

        {!isAuthenticated && <Link to="/login">Login</Link>}

        {isAuthenticated && (
          <>
            <span className="nav-user">Hi {user?.username}</span>
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
