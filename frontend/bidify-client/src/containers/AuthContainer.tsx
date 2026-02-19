import { useContext, useState } from "react";
import AuthForm from "../components/AuthForm/AuthForm";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AuthContainer = () => {
  const { loginUser, registerUser } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("hej");
    try {
      await loginUser(username, password);
      console.log(username);
      navigate("/");
    } catch (error) {
      alert("Login failed");
    }
  };

  const handleRegister = async () => {
    try {
      await registerUser(username, password, email);
      setIsRegister(false);
    } catch (error) {
      alert("Register failed");
    }
  };

  return (
    <AuthForm
      username={username}
      password={password}
      email={email}
      isRegister={isRegister}
      setUsername={setUsername}
      setPassword={setPassword}
      setEmail={setEmail}
      setIsRegister={setIsRegister}
      onLogin={handleLogin}
      onRegister={handleRegister}
    />
  );
};

export default AuthContainer;
