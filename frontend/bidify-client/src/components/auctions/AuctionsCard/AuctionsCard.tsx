import "./AuctionsCard.css";
import AuctionsButton from "../../common/AuctionsButton/AuctionsButton";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import type { Auction } from "../../../types/Auction";
import { AuctionsContext } from "../../../context/AuctionContext";

type Props = {
  auction: Auction;
  showOwnerActions?: boolean;
  onInspect?: (id: number) => void;
};
const AuctionCard = ({
  auction,
  onInspect,
  showOwnerActions = false,
}: Props) => {
  const { user } = useContext(AuthContext);
  const { openEdit } = useContext(AuctionsContext);
  const isClosed = new Date(auction.endDate).getTime() <= Date.now();
  const isMyAuction = auction.userId === user?.userId;

  return (
    <div className={`auction-card ${isClosed ? "finished" : "open"}`}>
      {isClosed && <div className="finished-badge">Finished</div>}
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
            <AuctionsButton text="Bid" disabled={!user || isClosed} />
            {!user && <small className="hint">Login to bid</small>}
            {isClosed && <small> Finised</small>}
          </div>
        )}
        {!showOwnerActions && (
          <AuctionsButton
            onClick={() => onInspect?.(auction.auctionId)}
            text="Inspect"
          />
        )}
      </div>

      {showOwnerActions && isMyAuction && (
        <div className="card-actions">
          <AuctionsButton text="Delete" />
          <AuctionsButton onClick={() => openEdit(auction)} text="Change" />
        </div>
      )}
    </div>
  );
};

export default AuctionCard;
