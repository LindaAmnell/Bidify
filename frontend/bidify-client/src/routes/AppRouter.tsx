import { Routes, Route } from "react-router-dom";
import AuctionsPage from "../pages/AuctionsPage";
import AuthPage from "../pages/AuthPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<AuctionsPage />} />
      <Route path="/login" element={<AuthPage />} />
    </Routes>
  );
};

export default AppRouter;
