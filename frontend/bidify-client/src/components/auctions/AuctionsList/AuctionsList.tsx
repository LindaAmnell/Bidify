import AuctionCard from "../AuctionsCard/AuctionsCard";
// import "./AuctionList.css";
import "./AuctionsList.css";

const AuctionList = () => {
  return (
    <section className="auction-grid">
      <AuctionCard />
      <AuctionCard />
    </section>
  );
};

export default AuctionList;
