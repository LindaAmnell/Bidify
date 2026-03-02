import { useContext } from "react";
import type { Bid } from "../../../../../types/bids";
import "./BidCard.css";
import { AuthContext } from "../../../../../context/AuthContext";
interface BidProps {
  bid: Bid;
  isHighestBid: boolean;
  onDeleteBid: (bidId: number) => void;
}

const BidCard = ({ bid, isHighestBid, onDeleteBid }: BidProps) => {
  const { user } = useContext(AuthContext);

  const isOwner = user?.username === bid.username;

  const canDelete = isOwner && isHighestBid;

  const handleDelete = () => {
    onDeleteBid(bid.id);
  };

  return (
    <div className="bid-card">
      <div className="bid-top">
        <span className="bid-amount">{bid.bidAmount} SEK</span>
        {canDelete && (
          <button
            className="delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}>
            ✕
          </button>
        )}
      </div>

      <div className="bid-bottom">
        <span className="bid-user">{bid.username}</span>
        <span className="bid-date">
          {new Date(bid.bidDate).toLocaleDateString("sv-SE")}
        </span>
      </div>
    </div>
  );
};

export default BidCard;
