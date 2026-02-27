import type { Bid } from "../../../../../types/bids";
import "./BidCard.css";
interface BidProps {
  bid: Bid;
}

const BidCard = ({ bid }: BidProps) => {
  return (
    <div className="bid-card">
      <p>{bid.bidAmount} SEK</p>
      <p>{bid.username}</p>
      <p>{new Date(bid.bidDate).toLocaleDateString("sv-SE")}</p>
    </div>
  );
};

export default BidCard;
