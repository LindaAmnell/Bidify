import "./AuctionsCard.css";
import AuctionsButton from "../../common/AuctionsButton/AuctionsButton";
import { useContext } from "react";
import { AuthContext } from "../../../context/AutchContext";
import type { Auction } from "../../../types/Auction";

type Props = {
  auction: Auction;
};

const AuctionCard = ({ auction }: Props) => {
  const { user } = useContext(AuthContext);

  const isMyAuction = auction.userId === user?.id;

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

      {!isMyAuction && (
        <div className="card-actions">
          <AuctionsButton text="Bid" />
          <AuctionsButton text="Inspect" />
        </div>
      )}

      {isMyAuction && (
        <div className="card-actions">
          <AuctionsButton text="Delete" />
          <AuctionsButton text="Change" />
        </div>
      )}
    </div>
  );
};

export default AuctionCard;
