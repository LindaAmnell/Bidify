import { api } from "./api";

export const loginUser = (username: string, password: string) => {
  return api("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
};

export const registerUser = (
  username: string,
  password: string,
  email: string,
) => {
  return api("/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, email }),
  });
};

export const getMe = () => {
  const token = localStorage.getItem("token");

  return api("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
