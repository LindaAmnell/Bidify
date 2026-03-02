import { useContext, useState } from "react";
import { AuctionsContext } from "../context/AuctionContext";
import SearchBar from "../components/common/SearchBar/SearchBar";
import AuctionList from "../components/auctions/AuctionsList/AuctionsList";
import { useNavigate } from "react-router-dom";
import CheckboxContainer from "../components/common/checkBox/CheckBoxContainer/CheckboxContainer";

const AuctionsContainer = () => {
  const { auctions, inspectAuction } = useContext(AuctionsContext);
  const [search, setSearch] = useState("");
  const [showOpen, setShowOpen] = useState(false);
  const [showClosed, setShowClosed] = useState(false);
  const navigate = useNavigate();

  const filteredAuctions = auctions
    .filter((a) => a.isActive)
    .filter((a) => a.title.toLowerCase().includes(search.toLowerCase()))
    .filter((a) => {
      const isClosed = new Date(a.endDate).getTime() <= Date.now();

      if (showClosed && isClosed) return true;
      if (showOpen && !isClosed) return true;
      if (!showOpen && !showClosed) return true;

      return false;
    });
  const handleInspect = async (id: number) => {
    await inspectAuction(id);
    console.log(id);
    navigate(`/inspectAuction/${id}`);
  };

  return (
    <>
      <SearchBar onSearch={setSearch} />
      <CheckboxContainer
        options={[
          {
            label: "Open",
            checked: showOpen,
            onChange: () => {
              if (showOpen) {
                setShowOpen(false);
              } else {
                setShowOpen(true);
                setShowClosed(false);
              }
            },
          },
          {
            label: "Closed",
            checked: showClosed,
            onChange: () => {
              if (showClosed) {
                setShowClosed(false);
              } else {
                setShowClosed(true);
                setShowOpen(false);
              }
            },
          },
        ]}
      />
      <AuctionList onInspect={handleInspect} auctions={filteredAuctions} />
    </>
  );
};

export default AuctionsContainer;
