const API_URL = "https://mada.akarmusic.com/wp-json/wp/v2";

/* =========================
   BERITA + AGENDA
========================= */
export async function getBeritaAgenda() {
  const res = await fetch(
    `${API_URL}/posts?_embed&categories=44,63&per_page=6`,
    {
      cache: "no-store",
    }
  );

  return res.json();
}

/* =========================
   HERO (kategori 43)
========================= */
export async function getHeroPosts() {
  const res = await fetch(
    "https://mada.akarmusic.com/wp-json/wp/v2/posts?_embed&categories=43&per_page=5",
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Gagal fetch hero");

  return res.json();
}
/* =========================
   SINGLE CATEGORY (PROFILE)
========================= */
async function getSingleByCategory(catId: number) {
  const res = await fetch(
    `${API_URL}/posts?_embed&categories=${catId}&per_page=1`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();
  return data[0];
}

/* =========================
   PROFILE
========================= */
export const getKetuaJurusan = () => getSingleByCategory(45);
export const getProdiHumas = () => getSingleByCategory(46);
export const getProdiJurnalistik = () => getSingleByCategory(64);


/* =========================
   DETIL BERITA
========================= */

export async function getPostBySlug(slug: string) {
  const res = await fetch(
    `https://mada.akarmusic.com/wp-json/wp/v2/posts?slug=${slug}&_embed`,
    { cache: "no-store" }
  );

  const data = await res.json();
  return data[0];
}