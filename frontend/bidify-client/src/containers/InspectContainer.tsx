import { useState } from "react";
import InspectAuction from "../components/auctions/InspectAuction/InspectAuction";
import BidModule from "../components/layout/popup/BidModule/BidModule";

const InspectContainer = () => {
  const [showBids, setShowBids] = useState(false);

  return (
    <>
      <InspectAuction onShowBids={() => setShowBids(true)} />

      {showBids && <BidModule onClose={() => setShowBids(false)} />}
    </>
  );
};

export default InspectContainer;
