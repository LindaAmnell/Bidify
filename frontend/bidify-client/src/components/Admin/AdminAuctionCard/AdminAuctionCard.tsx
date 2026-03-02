import type { Auction } from "../../../types/Auction";
import "./AdminAuctionCard.css";

type Props = {
  auction: Auction;
  onDeactivate: (id: number) => void;
};

const AdminAuctionCard = ({ auction, onDeactivate }: Props) => {
  return (
    <div className="admin-auction-card">
      <h3>{auction.title}</h3>
      <p>Seller: {auction.ownerName}</p>
      <p>Ends: {new Date(auction.endDate).toLocaleDateString("sv-SE")}</p>
      <p>Status: {auction.isActive ? "Active" : "Inactive"}</p>

      {auction.isActive && (
        <button onClick={() => onDeactivate(auction.auctionId)}>
          Inactivate
        </button>
      )}
    </div>
  );
};

export default AdminAuctionCard;
