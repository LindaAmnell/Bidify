import "./AuctionsCard.css";
import tv from "../../../assets/images/samsung-curved-65-tums-4k-uhd-tv.jpg";
import AuctionsButton from "../../common/AuctionsButton/AuctionsButton";

const AuctionCard = () => {
  return (
    <div className="auction-card open">
      <div className="image-placeholder">
        <img src={tv} />
      </div>
      <div className="info-div">
        <h3>TV</h3>
        <p>2026-02-07</p>
        <p>300 SEK</p>
      </div>

      <div className="card-actions">
        <AuctionsButton text="Bid" />
        <AuctionsButton text="Inspect" />
      </div>
    </div>
  );
};

export default AuctionCard;
