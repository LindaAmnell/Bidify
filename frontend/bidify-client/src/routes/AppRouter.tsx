import { Routes, Route } from "react-router-dom";
import AuctionsPage from "../pages/AuctionsPage";
import AuthPage from "../pages/AuthPage";
import MyAuctionPage from "../pages/MyAuctionPage";
import ProtectedRoute from "./ProtectedRoute";
import InspectAuctionPage from "../pages/InspectAuctionPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<AuctionsPage />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/inspectAuction/:id" element={<InspectAuctionPage />} />
      <Route
        path="/myAuction"
        element={
          <ProtectedRoute>
            <MyAuctionPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRouter;
