import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import Navbar from "./components/layout/Header/Navbar";
import { AuctionsProvider } from "./context/AuctionContext";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <AuctionsProvider>
        <BrowserRouter>
          <Navbar />
          <AppRouter />
        </BrowserRouter>
      </AuctionsProvider>
    </AuthProvider>
  );
};

export default App;
