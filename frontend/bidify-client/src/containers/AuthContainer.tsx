import { useContext } from "react";
import AuthForm from "../components/AuthForm/AuthForm";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AuthContainer = () => {
  const { loginUser, registerUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (username: string, password: string) => {
    try {
      await loginUser(username, password);
      console.log("då");
      navigate("/");
    } catch {
      alert("Login failed");
    }
  };

  const handleRegister = async (
    username: string,
    password: string,
    email: string,
  ) => {
    try {
      await registerUser(username, password, email);
      navigate("/");
    } catch {
      alert("Register failed");
    }
  };

  return <AuthForm onLogin={handleLogin} onRegister={handleRegister} />;
};

export default AuthContainer;
