import { createContext, type ReactNode } from "react";

export const AuctionContext = createContext({});

export const AuctionProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AuctionContext.Provider value={{}}>{children}</AuctionContext.Provider>
  );
};
