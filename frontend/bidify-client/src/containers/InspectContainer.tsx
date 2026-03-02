import { useContext, useState } from "react";
import InspectAuction from "../components/auctions/InspectAuction/InspectAuction";
import BidModule from "../components/layout/popup/BidModule/BidModule";
import { AuctionsContext } from "../context/AuctionContext";
import { deleteBid, placeBid } from "../services/bidService";

const InspectContainer = () => {
  const [showBids, setShowBids] = useState(false);
  const [message, setMessage] = useState("");
  const { inspectedAuction, setInspectedAuction, fetchAuctions } =
    useContext(AuctionsContext);

  const handlePlaceBid = async (amount: number) => {
    if (!inspectedAuction) return;

    if (!amount || amount <= inspectedAuction.highestBid) {
      setMessage("Bid must be higher than current highest bid");
      return;
    }

    try {
      const newBid = await placeBid(inspectedAuction.auctionId, amount);

      setInspectedAuction((prev) =>
        prev
          ? {
              ...prev,
              highestBid: newBid.bidAmount,
              bids: [newBid, ...prev.bids],
            }
          : prev,
      );

      setMessage("");
      fetchAuctions();
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  const handleDeleteBid = async (bidId: number) => {
    if (!inspectedAuction) return;

    try {
      await deleteBid(bidId);

      setInspectedAuction((prev) => {
        if (!prev) return prev;

        const updatedBids = prev.bids.filter((b) => b.id !== bidId);

        return {
          ...prev,
          bids: updatedBids,
          highestBid: updatedBids.length
            ? Math.max(...updatedBids.map((b) => b.bidAmount))
            : 0,
        };
      });

      fetchAuctions();
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  return (
    <>
      <InspectAuction
        onShowBids={() => setShowBids(true)}
        onPlaceBid={handlePlaceBid}
        message={message}
        clearMessage={() => setMessage("")}
      />

      {showBids && (
        <BidModule
          onClose={() => setShowBids(false)}
          onDeleteBid={handleDeleteBid}
        />
      )}
    </>
  );
};

export default InspectContainer;
