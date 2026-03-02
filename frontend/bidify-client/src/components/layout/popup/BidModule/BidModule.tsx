import { useContext } from "react";
import { AuctionsContext } from "../../../../context/AuctionContext";
import BidCardList from "./BidCardList/BidCardList";
import "./BidModule.css";

interface Props {
  onClose: () => void;
  onDeleteBid: (bidId: number) => void;
}

const BidModule = ({ onClose, onDeleteBid }: Props) => {
  const { inspectedAuction } = useContext(AuctionsContext);

  if (!inspectedAuction) return null;

  return (
    <div className="bid-modal-overlay" onClick={onClose}>
      <div className="bid-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="bid-close-btn" onClick={onClose}>
          ✕
        </button>

        <h2>Bid history</h2>

        <hr className="bid-divider" />
        <BidCardList bids={inspectedAuction.bids} onDeleteBid={onDeleteBid} />
      </div>
    </div>
  );
};

export default BidModule;
