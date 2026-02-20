import { useContext } from "react";
import AuctionList from "../components/auctions/AuctionsList/AuctionsList";
import AuctionForm from "../components/layout/popup/AuctionFrom";
import Button from "../components/common/Buttons/Button";
import { AuctionsContext } from "../context/AuctionContext";
import { AuthContext } from "../context/AuthContext";

const MyAuctionContainer = () => {
  const { auctions, form, openCreate } = useContext(AuctionsContext);
  const { user } = useContext(AuthContext);

  const myAuctions = auctions.filter((a) => a.userId === user?.userId);

  return (
    <>
      {form.isCreate && <AuctionForm />}

      {!form.isCreate && <Button onClick={openCreate} text="Create Auction" />}

      <AuctionList auctions={myAuctions} showOwnerActions />
    </>
  );
};

export default MyAuctionContainer;
