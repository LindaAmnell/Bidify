import { useContext, useState } from "react";
import { AuctionsContext } from "../context/AuctionContext";
import SearchBar from "../components/common/SearchBar/SearchBar";
import AuctionList from "../components/auctions/AuctionsList/AuctionsList";
import { useNavigate } from "react-router-dom";

const AuctionsContainer = () => {
  const { auctions, inspectAuction } = useContext(AuctionsContext);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleInspect = async (id: number) => {
    await inspectAuction(id);
    console.log(id);
    navigate(`/inspectAuction/${id}`);
  };

  const filteredAuctions = auctions.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <SearchBar onSearch={setSearch} />
      <AuctionList onInspect={handleInspect} auctions={filteredAuctions} />
    </>
  );
};

export default AuctionsContainer;
