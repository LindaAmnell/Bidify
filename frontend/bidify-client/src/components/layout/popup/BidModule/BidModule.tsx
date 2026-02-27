import { useContext } from "react";
import { AuctionsContext } from "../../../../context/AuctionContext";
import BidCardList from "./BidCardList/BidCardList";
import "./BidModule.css";

interface Props {
  onClose: () => void;
}

const BidModule = ({ onClose }: Props) => {
  const { inspectedAuction } = useContext(AuctionsContext);

  if (!inspectedAuction) return null;

  return (
    <div className="bid-modal-overlay" onClick={onClose}>
      <div className="bid-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="bid-close-btn" onClick={onClose}>
          ✕
        </button>

        <h2>Bid history</h2>

        <div className="bid-header-row">
          <p>Bid</p>
          <p>Bidder</p>
          <p>Time</p>
        </div>

        <BidCardList bids={inspectedAuction.bids} />
      </div>
    </div>
  );
};

export default BidModule;
