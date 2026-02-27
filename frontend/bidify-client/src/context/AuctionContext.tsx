import { createContext, useEffect, useState, type ReactNode } from "react";
import type { Auction, AuctionForm } from "../types/Auction";
import {
  getAllAuctions,
  createAuction as createAuctionService,
  updateAuction as updateAuctionService,
  getAuctionById,
} from "../services/auctionService";

type AuctionsContextType = {
  auctions: Auction[];
  fetchAuctions: () => void;

  inspectAuction: (id: number) => Promise<void>;
  inspectedAuction: Auction | null;
  setInspectedAuction: React.Dispatch<React.SetStateAction<Auction | null>>;

  createAuction: (auction: {
    title: string;
    description: string;
    startPrice: number;
    imageUrl: string;
  }) => Promise<void>;

  updateAuction: (
    id: number,
    auction: {
      title: string;
      description: string;
      startPrice: number;
      imageUrl: string;
      startDate: string;
      endDate: string;
    },
  ) => Promise<void>;

  form: AuctionForm;
  setForm: React.Dispatch<React.SetStateAction<AuctionForm>>;
  openCreate: () => void;
  openEdit: (auction: Auction) => void;
  closeForm: () => void;
};

export const AuctionsContext = createContext<AuctionsContextType>(
  {} as AuctionsContextType,
);

export const AuctionsProvider = ({ children }: { children: ReactNode }) => {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [inspectedAuction, setInspectedAuction] = useState<Auction | null>(
    null,
  );

  const [form, setForm] = useState<AuctionForm>({
    title: "",
    description: "",
    startPrice: "",
    imageUrl: "",
    isCreate: false,
  });

  // 🔹 FETCH ALL
  const fetchAuctions = async () => {
    try {
      const data = await getAllAuctions();
      setAuctions(data);
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 FETCH ONE
  const inspectAuction = async (id: number) => {
    try {
      const auction = await getAuctionById(id);
      setInspectedAuction(auction);
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 CREATE
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

  // 🔹 UPDATE
  const updateAuction = async (
    id: number,
    auction: {
      title: string;
      description: string;
      startPrice: number;
      imageUrl: string;
      startDate: string;
      endDate: string;
    },
  ) => {
    try {
      await updateAuctionService(id, auction);
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

  // 🔹 FORM CONTROLS
  const openCreate = () => {
    setForm((prev) => ({ ...prev, isCreate: true }));
  };

  const openEdit = (auction: Auction) => {
    setForm({
      title: auction.title,
      description: auction.description,
      startPrice: auction.startPrice.toString(),
      imageUrl: auction.imageUrl,
      isCreate: false,
      auctionId: auction.auctionId,
      hasBids: auction.highestBid > auction.startPrice,
    });
  };

  const closeForm = () => {
    setForm({
      title: "",
      description: "",
      startPrice: "",
      imageUrl: "",
      isCreate: false,
      auctionId: undefined,
      hasBids: false,
    });
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
        updateAuction,
        form,
        setForm,
        openCreate,
        openEdit,
        closeForm,
        inspectedAuction,
        inspectAuction,
        setInspectedAuction,
      }}>
      {children}
    </AuctionsContext.Provider>
  );
};
