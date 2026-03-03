import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { updatePassword } from "../../services/userService";
import "./ProfileFrom.css";
import Button from "../common/Buttons/Button";

const ProfileForm = () => {
  const { user } = useContext(AuthContext);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  if (!user) return null;

  const handleSubmit = async () => {
    try {
      setMessage("");

      if (!newPassword) {
        setMessage("Password cannot be empty");
        return;
      }

      if (newPassword.length < 6) {
        setMessage("Password must be at least 6 characters");
        return;
      }

      if (newPassword !== confirmPassword) {
        setMessage("Passwords do not match");
        return;
      }

      await updatePassword(newPassword);

      setMessage("Password updated successfully ✅");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  return (
    <div className="profile-form">
      <h1>Profile</h1>

      <div>
        <label>Username</label>
        <input type="text" value={user.username} disabled />
      </div>

      <div>
        <label>Email</label>
        <input type="text" value={user.email} disabled />
      </div>

      <div>
        <label>New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>

      <div>
        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      {message && <p>{message}</p>}

      <Button onClick={handleSubmit} text="Update" />
    </div>
  );
};

export default ProfileForm;
