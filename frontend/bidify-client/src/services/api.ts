const baseUrl = import.meta.env.VITE_API_URL;

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
