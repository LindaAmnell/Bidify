import { useContext } from "react";
import { AuctionsContext } from "../../../context/AuctionContext";

import Button from "../../common/Buttons/Button";
import { Link } from "react-router-dom";

const InspectAuction = () => {
  const { inspectedAuction } = useContext(AuctionsContext);

  const auction = inspectedAuction;

  return (
    <>
      <section className="auction-section">
        <h3>{auction?.title}</h3>
        <div className="inspected-info">
          <div className="image-auction">
            <img src={auction?.imageUrl} alt={auction?.title} />
          </div>
          <div className="date">
            <div>
              <p>Start date</p>
              <p>{auction?.startDate}</p>
            </div>
            <div>
              <p>End date</p>
              <p>{auction?.endDate}</p>
            </div>
            <div>
              <h4>Description</h4>
              <p>{auction?.description}</p>
            </div>
          </div>
          <div>
            {auction?.highestBid === auction?.startPrice ? (
              <p>Start Price</p>
            ) : (
              <p>Highest Bid</p>
            )}

            <p>{auction?.highestBid}</p>

            <Link to="./"> Show bids</Link>
            <Button text="Bid" />
          </div>
          <h2>{auction?.ownerName}</h2>
        </div>
      </section>
    </>
  );
};

export default InspectAuction;
