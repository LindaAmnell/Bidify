import { createContext, useEffect, useState, type ReactNode } from "react";
import type { Auction } from "../types/Auction";
import { getAllAuctions } from "../services/auctionService";

type AuctionsContextType = {
  auctions: Auction[];
  fetchAuctions: () => void;
};

export const AuctionsContext = createContext<AuctionsContextType>(
  {} as AuctionsContextType,
);

export const AuctionsProvider = ({ children }: { children: ReactNode }) => {
  const [auctions, setAuctions] = useState<Auction[]>([]);

  const fetchAuctions = async () => {
    try {
      const data = await getAllAuctions();
      setAuctions(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAuctions();
  }, []);

  return (
    <AuctionsContext.Provider value={{ auctions, fetchAuctions }}>
      {children}
    </AuctionsContext.Provider>
  );
};
