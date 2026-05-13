const BASE_URL = "https://cms.komunikasi.uinsgd.ac.id/wp-json/wp/v2";

export async function fetcher<T>(
  endpoint: string,
  options?: RequestInit & { revalidate?: number }
): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    next: {
      revalidate: options?.revalidate ?? 60, // default aman
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`Fetch error: ${endpoint}`);
  }

  return res.json();
}