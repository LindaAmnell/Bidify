import { useContext, useState } from "react";
import { AuctionsContext } from "../context/AuctionContext";
import SearchBar from "../components/common/SearchBar/SearchBar";
import AuctionList from "../components/auctions/AuctionsList/AuctionsList";

const AuctionsContainer = () => {
  const { auctions } = useContext(AuctionsContext);
  const [search, setSearch] = useState("");

  const filteredAuctions = auctions.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <SearchBar onSearch={setSearch} />
      <AuctionList auctions={filteredAuctions} />
    </>
  );
};

export default AuctionsContainer;
