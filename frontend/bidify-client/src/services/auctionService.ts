import type { Auction } from "../types/Auction";
import { api } from "./api";

export const getAllAuctions = (): Promise<Auction[]> =>
  api("http://localhost:5215/api/auction");

export const createAuction = (auction: {
  title: string;
  description: string;
  startPrice: number;
  imageUrl: string;
}) => {
  const token = localStorage.getItem("token");
  console.log("TOKEN:", token);

  return api("http://localhost:5215/api/auction", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(auction),
  });
};

export const updateAuction = (
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
  const token = localStorage.getItem("token");

  return api(`http://localhost:5215/api/auction/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(auction),
  });
};

export const getAuctionById = (id: number) =>
  api(`http://localhost:5215/api/auction/${id}`);

export const deactivateAuction = (id: number) => {
  const token = localStorage.getItem("token");

  return api(`http://localhost:5215/api/auction/${id}/deactivate`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
