import { api } from "./api";

export const getUserById = async (id?: number) => {
  api(`/user/${id}`);
  console.log(id);
};

export const updatePassword = (newPassword: string) => {
  const token = localStorage.getItem("token");

  return api("/user/password", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ newPassword }),
  });
};

export const deactivateUser = (id: number) => {
  const token = localStorage.getItem("token");

  return api(`/user/${id}/deactivate`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllUsers = () => {
  const token = localStorage.getItem("token");

  return api("/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
