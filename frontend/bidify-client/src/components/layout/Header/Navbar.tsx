import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AutchContext";
import "./Navbar.css";
// import Button from "../../common/Buttons/Button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);

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

        <Link to="myAuction">My auctions</Link>
        {isAuthenticated && <Link to="myAuction">My auctions</Link>}

        {isAuthenticated && <Link to="/profile">Profile</Link>}

        {!isAuthenticated && <Link to="/login">Login</Link>}
        {/* {!isAuthenticated && <Button text="Login" />} */}

        {isAuthenticated && <button className="logout-btn">Logout</button>}
      </nav>
    </header>
  );
};

export default Navbar;
