import { api } from "./api";

export const getAllAuctions = () => api("http://localhost:5215/api/auction");
