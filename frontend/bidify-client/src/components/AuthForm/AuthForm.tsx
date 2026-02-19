import { useState } from "react";
import Button from "../common/Buttons/Button";
import "./AuthForm.css";
const AuthForm = () => {
  const [isRegister, setIsRegister] = useState<boolean>(false);

  const handleRegister = () => {
    setIsRegister(true);
  };

  return (
    <section className="form-section">
      <form className="form">
        <label>Username</label>
        <input type="text" autoComplete="username" />

        <label>Password</label>
        <input type="password" autoComplete="current-password" />

        {isRegister && (
          <>
            <label>Email</label>
            <input type="email" autoComplete="email" />
          </>
        )}
      </form>

      <div className="btn-div">
        {!isRegister && <Button text="Login" />}
        <Button onClick={handleRegister} text="Register" />
      </div>
    </section>
  );
};

export default AuthForm;
