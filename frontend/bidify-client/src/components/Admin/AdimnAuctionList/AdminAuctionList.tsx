import AdminAuctionCard from "../AdminAuctionCard/AdminAuctionCard";
import type { Auction } from "../../../types/Auction";

type Props = {
  auctions: Auction[];
  onDeactivate: (id: number) => void;
};

const AdminAuctionList = ({ auctions, onDeactivate }: Props) => {
  if (auctions.length === 0) {
    return <p>No auctions found</p>;
  }

  return (
    <div className="admin-auction-list">
      {auctions.map((auction) => (
        <AdminAuctionCard
          key={auction.auctionId}
          auction={auction}
          onDeactivate={onDeactivate}
        />
      ))}
    </div>
  );
};

export default AdminAuctionList;
