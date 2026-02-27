import type { Bid } from "../../../../../types/bids";
import BidCard from "../BidCard/BidCard";

interface BidProps {
  bids: Bid[];
}

const BidCardList = ({ bids }: BidProps) => {
  if (bids.length === 0) {
    return <p>No bids yet</p>;
  }
  return (
    <>
      {bids.map((bid) => (
        <BidCard key={bid.id} bid={bid} />
      ))}
    </>
  );
};

export default BidCardList;
