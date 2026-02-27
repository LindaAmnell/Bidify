import { useState } from "react";
import Button from "../common/Buttons/Button";
import "./AuthForm.css";

type Props = {
  onLogin: (username: string, password: string) => Promise<void>;
  onRegister: (
    username: string,
    password: string,
    email: string,
  ) => Promise<void>;
};
const AuthForm = ({ onLogin, onRegister }: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      await onRegister(username, password, email);
    } else {
      await onLogin(username, password);
    }
  };

  return (
    <section className="form-section">
      <form className="form" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />

        {isRegister && (
          <>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </>
        )}

        <div className="btn-div">
          <Button text={isRegister ? "Register" : "Login"} type="submit" />

          <Button
            text={isRegister ? "Already have an account?" : "Create account"}
            type="button"
            onClick={() => setIsRegister((prev) => !prev)}
          />
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
