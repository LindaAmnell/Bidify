import type { Bid } from "../../../../../types/bids";
import BidCard from "../BidCard/BidCard";

interface BidProps {
  bids: Bid[];
  onDeleteBid: (bidId: number) => void;
}

const BidCardList = ({ bids, onDeleteBid }: BidProps) => {
  if (bids.length === 0) {
    return <p>No bids yet</p>;
  }
  const highestBid = bids.reduce((max, bid) =>
    bid.bidAmount > max.bidAmount ? bid : max,
  );
  return (
    <>
      {bids.map((bid) => (
        <BidCard
          key={bid.id}
          bid={bid}
          isHighestBid={bid.id === highestBid.id}
          onDeleteBid={onDeleteBid}
        />
      ))}
    </>
  );
};

export default BidCardList;
