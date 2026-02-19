import Button from "../common/Buttons/Button";
import "./AuthForm.css";

type Props = {
  username: string;
  password: string;
  email: string;
  isRegister: boolean;
  setUsername: (value: string) => void;
  setPassword: (value: string) => void;
  setEmail: (value: string) => void;
  setIsRegister: (value: boolean) => void;
  onLogin: () => void;
  onRegister: () => void;
};

const AuthForm = ({
  username,
  password,
  email,
  isRegister,
  setUsername,
  setPassword,
  setEmail,
  setIsRegister,
  onLogin,
  onRegister,
}: Props) => {
  return (
    <section className="form-section">
      {/* <h2>{isRegister ? "Register" : "Login"}</h2> */}

      <form className="form">
        <label>Username</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
      </form>

      <div className="btn-div">
        {!isRegister && <Button text="Login" onClick={onLogin} />}
        {isRegister && <Button text="Register" onClick={onRegister} />}
        {!isRegister && (
          <Button text="Create account" onClick={() => setIsRegister(true)} />
        )}
      </div>
    </section>
  );
};

export default AuthForm;
