import { useState } from "react";
import Button from "../common/Buttons/Button";
import "./AuthForm.css";
const AuthForm = () => {
  const [isRegister, setIsRegister] = useState<boolean>(false);

  const handleRegister = () => {
    setIsRegister(true);
  };

  return (
    <section className="login-section">
      <div className="login-form">
        <label>Username</label>
        <input type="text" />
        <label>Password</label>
        <input type="password" />
        {isRegister && (
          <>
            <label>Email</label>
            <input type="text" />
          </>
        )}
      </div>

      <div className="btn-div">
        {!isRegister && <Button text="Login" />}
        <Button onClick={handleRegister} text="Register" />
      </div>
    </section>
  );
};

export default AuthForm;
