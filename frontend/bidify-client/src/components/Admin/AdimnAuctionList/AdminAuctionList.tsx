import type { Auction } from "../../../types/Auction";
import AdminCard from "../AdminAuctionCard/AdminCard";
import "./AdminList.css";

type Props = {
  auctions: Auction[];
  onDeactivate: (id: number) => void;
};

const AdminAuctionList = ({ auctions, onDeactivate }: Props) => {
  if (auctions.length === 0) {
    return <p>No auctions found</p>;
  }

  return (
    <div className="admin-list">
      {auctions.map((auction) => {
        const isClosed = new Date(auction.endDate).getTime() <= Date.now();

        return (
          <AdminCard
            key={auction.auctionId}
            title={auction.title}
            subtitle={`Seller: ${auction.ownerName}`}
            status={auction.isActive ? "Active" : "Inactive"}
            isActive={auction.isActive}
            extraInfo={
              isClosed ? (
                <p>Finished</p>
              ) : (
                <p>
                  Ends: {new Date(auction.endDate).toLocaleDateString("sv-SE")}
                </p>
              )
            }
            onAction={() => onDeactivate(auction.auctionId)}
            actionLabel="Inactivate"
          />
        );
      })}
    </div>
  );
};

export default AdminAuctionList;
