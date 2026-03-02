import { useContext } from "react";
import { AuctionsContext } from "../context/AuctionContext";
import { AuthContext } from "../context/AuthContext";

import { deactivateAuction } from "../services/auctionService";
import AdminAuctionList from "../components/Admin/AdimnAuctionList/AdminAuctionList";

const AdminContainer = () => {
  const { auctions, fetchAuctions } = useContext(AuctionsContext);
  const { user } = useContext(AuthContext);

  if (user?.role !== "Admin") {
    return <p>Access denied</p>;
  }

  const handleDeactivateAuction = async (id: number) => {
    try {
      await deactivateAuction(id);
      fetchAuctions();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <section>
        <AdminAuctionList
          auctions={auctions}
          onDeactivate={handleDeactivateAuction}
        />
      </section>
    </div>
  );
};

export default AdminContainer;
