import AuctionCard from "../AuctionsCard/AuctionsCard";
import "./AuctionsList.css";
import type { Auction } from "../../../types/Auction";

type Props = {
  auctions: Auction[];
};

const AuctionList = ({ auctions }: Props) => {
  return (
    <section className="auction-grid">
      {auctions.map((auction) => (
        <AuctionCard key={auction.auctionId} auction={auction} />
      ))}
    </section>
  );
};

export default AuctionList;
