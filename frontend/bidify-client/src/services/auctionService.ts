import { api } from "./api";

export const getAllAuctions = () => api("http://localhost:5215/api/auction");

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
