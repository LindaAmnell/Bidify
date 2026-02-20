import { createContext, useEffect, useState, type ReactNode } from "react";
import type { Auction, AuctionForm } from "../types/Auction";
import {
  getAllAuctions,
  createAuction as createAuctionService,
} from "../services/auctionService";

type AuctionsContextType = {
  auctions: Auction[];
  fetchAuctions: () => void;
  createAuction: (auction: {
    title: string;
    description: string;
    startPrice: number;
    imageUrl: string;
  }) => Promise<void>;

  form: AuctionForm;
  setForm: React.Dispatch<React.SetStateAction<AuctionForm>>;
  openCreate: () => void;
  closeCreate: () => void;
};

export const AuctionsContext = createContext<AuctionsContextType>(
  {} as AuctionsContextType,
);

export const AuctionsProvider = ({ children }: { children: ReactNode }) => {
  const [auctions, setAuctions] = useState<Auction[]>([]);

  const [form, setForm] = useState<AuctionForm>({
    title: "",
    description: "",
    startPrice: "",
    imageUrl: "",
    isCreate: false,
  });

  const fetchAuctions = async () => {
    try {
      const data = await getAllAuctions();
      setAuctions(data);
    } catch (error) {
      console.error(error);
    }
  };

  const createAuction = async (auction: {
    title: string;
    description: string;
    startPrice: number;
    imageUrl: string;
  }) => {
    try {
      await createAuctionService(auction);
      await fetchAuctions();

      setForm({
        title: "",
        description: "",
        startPrice: "",
        imageUrl: "",
        isCreate: false,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const openCreate = () => {
    setForm((prev) => ({ ...prev, isCreate: true }));
  };

  const closeCreate = () => {
    setForm((prev) => ({ ...prev, isCreate: false }));
  };

  useEffect(() => {
    fetchAuctions();
  }, []);

  return (
    <AuctionsContext.Provider
      value={{
        auctions,
        fetchAuctions,
        createAuction,
        form,
        setForm,
        openCreate,
        closeCreate,
      }}>
      {children}
    </AuctionsContext.Provider>
  );
};
