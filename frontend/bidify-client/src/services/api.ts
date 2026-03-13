const baseUrl =
  "https://bidify-fdgngnhzg3brbyha.swedencentral-01.azurewebsites.net/api";

export const api = async (endpoint: string, options?: RequestInit) => {
  const res = await fetch(`${baseUrl}${endpoint}`, options);

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message);
  }

  if (res.status === 204) return;

  const text = await res.text();
  if (!text) return;

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};
