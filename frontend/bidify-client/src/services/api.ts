export const api = async (url: string, options?: RequestInit) => {
  const res = await fetch(url, options);

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message);
  }

  if (res.status === 204) {
    return;
  }

  const text = await res.text();

  if (!text) return;

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};
