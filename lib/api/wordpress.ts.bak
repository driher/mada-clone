import { fetcher } from "../fetcher";

// helper normalizer
const first = (data: any) => data?.[0] || null;

// HERO
export const getHeroPosts = async () => {
  return await fetcher("/posts?categories=10&_embed&per_page=5");
};

// BERITA
export const getBeritaAgenda = async () => {
  return await fetcher("/posts?categories=65&_embed&per_page=6");
};

// PROFILE (INI YANG KRUSIAL)
export const getKetuaJurusan = async () => {
  const data = await fetcher("/posts?categories=20&_embed&per_page=1");
  return first(data);
};

export const getProdiHumas = async () => {
  const data = await fetcher("/posts?categories=21&_embed&per_page=1");
  return first(data);
};

export const getProdiJurnalistik = async () => {
  const data = await fetcher("/posts?categories=22&_embed&per_page=1");
  return first(data);
};