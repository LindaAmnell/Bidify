import { useContext } from "react";

import { AuthContext } from "../context/AutchContext";
import AuctionList from "../components/auctions/AuctionsList/AuctionsList";
import { AuctionsContext } from "../context/AuctionContext";

const MyAuctionContainer = () => {
  const { auctions } = useContext(AuctionsContext);
  const { user } = useContext(AuthContext);

  const myAuctions = auctions.filter((a) => a.userId === user?.id);

  return <AuctionList auctions={myAuctions} />;
};

export default MyAuctionContainer;
