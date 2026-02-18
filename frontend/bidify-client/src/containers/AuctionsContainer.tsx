import AuctionList from "../components/auctions/AuctionsList/AuctionsList";
import SearchBar from "../components/common/SearchBar/SearchBar";

const AuctionsContainer = () => {
  return (
    <>
      <SearchBar />
      <AuctionList />
    </>
  );
};

export default AuctionsContainer;
