import { api } from "./api";

export const getUserById = async (id?: number) => {
  api(`http://localhost:5215/api/user/${id}`);
  console.log(id);
};
