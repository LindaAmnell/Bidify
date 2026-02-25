import { Routes, Route } from "react-router-dom";
import AuctionsPage from "../pages/AuctionsPage";
import AuthPage from "../pages/AuthPage";
import MyAuctionPage from "../pages/MyAuctionPage";
import ProtectedRoute from "./ProtectedRoute";
import InspectContainer from "../containers/InspectContainer";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<AuctionsPage />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/inspectAuction/:id" element={<InspectContainer />} />
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
