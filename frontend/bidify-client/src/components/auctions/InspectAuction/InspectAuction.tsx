import { useContext, useState } from "react";
import { AuctionsContext } from "../../../context/AuctionContext";
import "./InspectAuction.css";
import Button from "../../common/Buttons/Button";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface Props {
  onShowBids: () => void;
  onPlaceBid: (amount: number) => Promise<void> | void;
  message: string;
  clearMessage: () => void;
}

const InspectAuction = ({
  onShowBids,
  onPlaceBid,
  message,
  clearMessage,
}: Props) => {
  const { inspectedAuction } = useContext(AuctionsContext);
  const { user } = useContext(AuthContext);
  const [showBidInput, setShowBidInput] = useState(false);
  const [bidAmount, setBidAmount] = useState("");
  const navigate = useNavigate();

  if (!inspectedAuction) {
    return <p>Loading...</p>;
  }
  const isMyAuction = inspectedAuction.ownerName === user?.username;
  const auction = inspectedAuction;
  const isClosed = new Date(auction.endDate).getTime() <= Date.now();

  const bidHandler = async () => {
    if (!showBidInput) {
      setShowBidInput(true);
      return;
    }

    const amount = Number(bidAmount);
    await onPlaceBid(amount);
    setBidAmount("");
  };

  return (
    <>
      <section className="auction-section">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ✕
        </button>
        <h3>{auction?.title}</h3>
        <div className="inspected-info">
          <div className="image-auction">
            <img src={auction.imageUrl} alt={auction.title} />
          </div>
          <div className="date">
            <div>
              <p>Start date</p>
              <p>{new Date(auction.startDate).toLocaleDateString("sv-SE")}</p>
            </div>
            <div>
              <p>End date</p>
              <p>{new Date(auction.endDate).toLocaleDateString("sv-SE")} </p>
            </div>
          </div>
          <div className="description-div">
            <h4>Description</h4>
            <p>{auction.description}</p>
          </div>
          <div className="bid-div">
            {isClosed && <h2 className="finished-text">Finished</h2>}

            {auction.highestBid === auction.startPrice ? (
              <h3>Start Price</h3>
            ) : (
              <h3>Highest Bid</h3>
            )}

            <p>{auction.highestBid} SEK</p>

            {!isClosed && (
              <>
                <button className="link-btn" onClick={onShowBids}>
                  Show bids
                </button>

                <div className="bid-btn">
                  {showBidInput && (
                    <>
                      {message && <p className="error-massage">{message}</p>}
                      <input
                        type="number"
                        placeholder="Bid amount"
                        value={bidAmount}
                        onChange={(e) => {
                          setBidAmount(e.target.value);
                          clearMessage();
                        }}
                      />
                    </>
                  )}

                  <Button
                    disabled={!user || isMyAuction}
                    text={showBidInput ? "Place Bid" : "Bid"}
                    onClick={bidHandler}
                  />
                  {!user && <small className="hint">Login to bid</small>}
                </div>
              </>
            )}
          </div>
          <h2>Seller: {auction.ownerName}</h2>
        </div>
      </section>
    </>
  );
};

export default InspectAuction;
