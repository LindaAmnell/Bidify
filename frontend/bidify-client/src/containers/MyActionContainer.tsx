import { useContext } from "react";
import AuctionList from "../components/auctions/AuctionsList/AuctionsList";
import { AuctionsContext } from "../context/AuctionContext";
import { AuthContext } from "../context/AuthContext";

const MyAuctionContainer = () => {
  const { auctions } = useContext(AuctionsContext);
  const { user } = useContext(AuthContext);

  const myAuctions = auctions.filter((a) => a.userId === user?.userId);

  return <AuctionList auctions={myAuctions} showOwnerActions />;
};

export default MyAuctionContainer;
