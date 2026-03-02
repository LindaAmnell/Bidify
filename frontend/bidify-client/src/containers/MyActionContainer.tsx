import { useContext } from "react";
import AuctionList from "../components/auctions/AuctionsList/AuctionsList";
import AuctionForm from "../components/layout/popup/AuctionForm/AuctionFrom";
import Button from "../components/common/Buttons/Button";
import { AuctionsContext } from "../context/AuctionContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyAuctionContainer = () => {
  const { auctions, form, openCreate, inspectAuction } =
    useContext(AuctionsContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const myAuctions = auctions.filter((a) => a.userId === user?.userId);

  const handleInspect = async (id: number) => {
    await inspectAuction(id);
    console.log(id);
    navigate(`/inspectAuction/${id}`);
  };

  return (
    <>
      {(form.isCreate || form.auctionId) && <AuctionForm />}

      <Button onClick={openCreate} text="Create Auction" />

      <AuctionList
        auctions={myAuctions}
        showOwnerActions
        onInspect={handleInspect}
      />
    </>
  );
};

export default MyAuctionContainer;
