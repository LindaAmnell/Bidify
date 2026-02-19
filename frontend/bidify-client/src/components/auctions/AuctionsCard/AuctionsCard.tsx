import "./AuctionsCard.css";
import AuctionsButton from "../../common/AuctionsButton/AuctionsButton";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import type { Auction } from "../../../types/Auction";

type Props = {
  auction: Auction;
  showOwnerActions?: boolean;
};
const AuctionCard = ({ auction, showOwnerActions = false }: Props) => {
  const { user } = useContext(AuthContext);

  const isMyAuction = auction.userId === user?.userId;

  return (
    <div className="auction-card open">
      <div className="image-placeholder">
        <img src={auction.imageUrl} />
      </div>

      <div className="info-div">
        <h3>{auction.title}</h3>
        <p>{new Date(auction.endDate).toLocaleDateString("sv-SE")}</p>
        <p>{auction.highestBid} SEK</p>
      </div>

      <div className="card-actions">
        {!isMyAuction && (
          <div className="bid-wrapper">
            <AuctionsButton text="Bid" disabled={!user} />
            {!user && <small className="hint">Login to bid</small>}
          </div>
        )}
        {!showOwnerActions && <AuctionsButton text="Inspect" />}
      </div>

      {showOwnerActions && isMyAuction && (
        <div className="card-actions">
          <AuctionsButton text="Delete" />
          <AuctionsButton text="Change" />
        </div>
      )}
    </div>
  );
};

export default AuctionCard;
