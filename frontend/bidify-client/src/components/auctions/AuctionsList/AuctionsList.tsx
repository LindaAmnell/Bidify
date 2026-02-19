import AuctionCard from "../AuctionsCard/AuctionsCard";
import "./AuctionsList.css";
import type { Auction } from "../../../types/Auction";

type Props = {
  auctions: Auction[];
  showOwnerActions?: boolean;
};

const AuctionList = ({ auctions, showOwnerActions = false }: Props) => {
  return (
    <section className="auction-grid">
      {auctions.map((auction) => (
        <AuctionCard
          key={auction.auctionId}
          auction={auction}
          showOwnerActions={showOwnerActions}
        />
      ))}
    </section>
  );
};

export default AuctionList;
