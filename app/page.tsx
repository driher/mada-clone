import type { Metadata } from "next";
import Script from "next/script";

import PopularLinks from "@/components/PopularLinks";
import ProfileCard from "@/components/ProfileCard";
import AcademicAnnouncement from "@/components/AcademicAnnouncement";
import dynamic from "next/dynamic";

const HeroSlider = dynamic(() => import("@/components/HeroSlider"));
const NewsModern = dynamic(() => import("@/components/NewsModern"));
const AgendaSlider = dynamic(() => import("@/components/AgendaSlider"));

import {
  getHeroPosts,
  getKetuaJurusan,
  getSekretarisJurusan,
  getProdiHumas,
  getProdiJurnalistik,
} from "@/lib/api";

export const revalidate = 300;

/* ================= SEO METADATA ================= */
export const metadata: Metadata = {
  title: "Ilmu Komunikasi UIN Bandung - Berita, Agenda, Pengumuman",
  description:
    "Website resmi Program Studi Ilmu Komunikasi UIN Sunan Gunung Djati Bandung. Berisi berita, agenda kegiatan, pengumuman akademik, dan informasi jurusan.",
  keywords: [
    "Ilmu Komunikasi UIN Bandung",
    "UIN SGD",
    "Berita Kampus",
    "Agenda Kampus",
    "Pengumuman Akademik",
  ],
  openGraph: {
    title: "Ilmu Komunikasi UIN Bandung",
    description:
      "Berita, agenda, dan pengumuman resmi Program Studi Ilmu Komunikasi UIN Bandung",
    url: "https://komunikasi.uinsgd.ac.id",
    siteName: "Ilmu Komunikasi UIN Bandung",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ilmu Komunikasi UIN Bandung",
    description: "Website resmi Prodi Ilmu Komunikasi UIN Bandung",
  },
};

export default async function Home() {
  const heroPosts = await getHeroPosts().catch(() => []);

  const beritaRes = await fetch(
    "https://cms.komunikasi.uinsgd.ac.id/wp-json/wp/v2/posts?_embed&per_page=6&categories=44",
    { next: { revalidate: 300 } }
  );
  const beritaPosts = await beritaRes.json().catch(() => []);

  const agendaRes = await fetch(
    "https://cms.komunikasi.uinsgd.ac.id/wp-json/wp/v2/posts?_embed&per_page=10&categories=63",
    { next: { revalidate: 300 } }
  );
  const agendaPosts = await agendaRes.json().catch(() => []);

  const ketua = await getKetuaJurusan().catch(() => null);
  const sekretaris = await getSekretarisJurusan().catch(() => null);
  const humas = await getProdiHumas().catch(() => null);
  const jurnalistik = await getProdiJurnalistik().catch(() => null);

  const getImage = (post: any) =>
    post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    post?._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.medium
      ?.source_url ||
    "/no-image.jpg";

  const getContent = (post: any) => {
    const text = (post?.excerpt?.rendered || post?.content?.rendered || "")
      .replace(/<[^>]*>/g, "")
      .replace(/\s+/g, " ")
      .trim();

    return text.length > 160
      ? text.slice(0, 160).replace(/\s+\S*$/, "") + "..."
      : text;
  };

  return (
    <>
      {/* GOOGLE ANALYTICS */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-FJ4R6P1CDB"
        strategy="afterInteractive"
      />

      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-FJ4R6P1CDB');
        `}
      </Script>

      <main className="bg-gradient-to-b from-slate-50 to-white min-h-screen">

        {/* HERO */}
        <section className="mb-10">
          <h1 className="sr-only">
            Ilmu Komunikasi UIN Sunan Gunung Djati Bandung
          </h1>

          <HeroSlider posts={heroPosts} />
        </section>

        {/* BERITA */}
        <section className="mb-14" aria-label="Berita terbaru">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              📰 Berita
            </h2>
            <p className="text-gray-500 mt-2">
              Informasi dan kabar terbaru seputar kegiatan dan akademik
            </p>

            <NewsModern posts={beritaPosts} />
          </div>
        </section>

        {/* AGENDA */}
        <section
          className="mb-16 bg-white/60 backdrop-blur-sm py-10 border-y border-slate-100"
          aria-label="Agenda kegiatan"
        >
          <div className="max-w-6xl mx-auto px-4 mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              📅 Agenda & Kegiatan
            </h2>
            <p className="text-slate-500 mt-1">
              Informasi kegiatan terbaru program studi
            </p>
            <div className="w-20 h-1 bg-blue-600 rounded-full mt-3" />
          </div>

          <AgendaSlider posts={agendaPosts} />
        </section>

        {/* PENGUMUMAN */}
        <section
          className="mb-16 bg-white/60 backdrop-blur-sm py-10 border-y border-slate-100"
          aria-label="Pengumuman akademik"
        >
          <div className="max-w-6xl mx-auto px-4 mb-6">

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              📢 Pengumuman
            </h2>

            <p className="text-slate-500 mt-1">
              Informasi resmi akademik dan pengumuman terbaru
            </p>

            <div className="w-24 h-1 bg-blue-600 rounded-full mt-3" />

            <AcademicAnnouncement />

          </div>
        </section>

        {/* LINKS */}
        <section className="mb-14">
          <div className="max-w-6xl mx-auto px-4">
            <PopularLinks />
          </div>
        </section>

        {/* PROFILE */}
        <section className="space-y-8 mb-16 max-w-6xl mx-auto px-4">

          {ketua && (
            <ProfileCard
              label="Ketua Jurusan"
              name={ketua?.title?.rendered ?? "Data belum tersedia"}
              image={getImage(ketua)}
              content={getContent(ketua)}
              color="green"
            />
          )}

          {sekretaris && (
            <ProfileCard
              label="Sekretaris Jurusan"
              name={sekretaris?.title?.rendered ?? "Data belum tersedia"}
              image={getImage(sekretaris)}
              content={getContent(sekretaris)}
              color="orange"
            />
          )}

          {humas && (
            <ProfileCard
              label="Ketua Prodi Humas"
              name={humas?.title?.rendered ?? "Data belum tersedia"}
              image={getImage(humas)}
              content={getContent(humas)}
              color="pink"
            />
          )}

          {jurnalistik && (
            <ProfileCard
              label="Ketua Prodi Jurnalistik"
              name={jurnalistik?.title?.rendered ?? "Data belum tersedia"}
              image={getImage(jurnalistik)}
              content={getContent(jurnalistik)}
              color="orange"
            />
          )}

        </section>

      </main>
    </>
  );
}