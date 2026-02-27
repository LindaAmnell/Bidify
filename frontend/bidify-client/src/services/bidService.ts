import { api } from "./api";
import type { Bid } from "../types/bids";

export const placeBid = (
  auctionId: number,
  bidAmount: number,
): Promise<Bid> => {
  const token = localStorage.getItem("token");
  console.log("TOKEN:", token);

  return api("http://localhost:5215/api/bid", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify({
      auctionId,
      bidAmount,
    }),
  });
};
