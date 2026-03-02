import { Routes, Route } from "react-router-dom";
import AuctionsPage from "../pages/AuctionsPage";
import AuthPage from "../pages/AuthPage";
import MyAuctionPage from "../pages/MyAuctionPage";
import ProtectedRoute from "./ProtectedRoute";
import InspectAuctionPage from "../pages/InspectAuctionPage";
import ProfilePage from "../pages/ProfilePage";
import AdminPage from "../pages/AdminPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<AuctionsPage />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/inspectAuction/:id" element={<InspectAuctionPage />} />
      <Route
        path="/myAuction"
        element={
          <ProtectedRoute>
            <MyAuctionPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRouter;
