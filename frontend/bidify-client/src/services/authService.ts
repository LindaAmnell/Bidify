import { api } from "./api";

export const loginUser = async (username: string, password: string) => {
  const res = await fetch("http://localhost:5215/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  return res.json();
};

export const registerUser = (
  username: string,
  password: string,
  email: string,
) => {
  return api("http://localhost:5215/api/Auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, email }),
  });
};
