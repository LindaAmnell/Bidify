export const api = async (url: string, options?: RequestInit) => {
  const res = await fetch(url, options);

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message);
  }

  const text = await res.text();

  // Om backend skickar JSON → parse
  try {
    return JSON.parse(text);
  } catch {
    // annars returnera text (t.ex token)
    return text;
  }
};
