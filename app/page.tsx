import BigHeroSlider from "@/components/BigHeroSlider";
import NewsModern from "@/components/NewsModern";
import AgendaSlider from "@/components/AgendaSlider";
import PopularLinks from "@/components/PopularLinks";
import AcademicAnnouncement from "@/components/AcademicAnnouncement";
import ProfileCard from "@/components/ProfileCard";

import {
  getKetuaJurusan,
  getSekretarisJurusan,
  getProdiHumas,
  getProdiJurnalistik,
} from "@/lib/api";

export default async function Home() {
  const [beritaRes, agendaRes, prestasiRes] = await Promise.all([
    fetch(
      "https://cms.komunikasi.uinsgd.ac.id/wp-json/wp/v2/posts?_embed&per_page=6&categories=44",
      { next: { revalidate: 300 } }
    ),
    fetch(
      "https://cms.komunikasi.uinsgd.ac.id/wp-json/wp/v2/posts?_embed&per_page=10&categories=63",
      { next: { revalidate: 300 } }
    ),
    fetch(
      "https://cms.komunikasi.uinsgd.ac.id/wp-json/wp/v2/posts?categories=80&_embed&per_page=1",
      { next: { revalidate: 300 } }
    ),
  ]);

  const beritaPosts = await beritaRes.json().catch(() => []);
  const agendaPosts = await agendaRes.json().catch(() => []);
  const prestasiPosts = await prestasiRes.json().catch(() => []);
  const prestasi = prestasiPosts?.[0];

  const [ketua, sekretaris, humas, jurnalistik] = await Promise.all([
    getKetuaJurusan().catch(() => null),
    getSekretarisJurusan().catch(() => null),
    getProdiHumas().catch(() => null),
    getProdiJurnalistik().catch(() => null),
  ]);

  const getImage = (post: any) =>
    post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    "/no-image.jpg";

  const getContent = (post: any) =>
    (post?.excerpt?.rendered || post?.content?.rendered || "")
      .replace(/<[^>]*>/g, "")
      .slice(0, 300);

  return (
    <>
      {/* ================= HERO FULL BLEED ================= */}
      <section className="w-full">
        <BigHeroSlider />
      </section>

      {/* ================= FRAMED CONTENT ================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">

        {/* NEWS */}
        <div>
          <h2 className="text-3xl font-bold mb-4">📰 Berita</h2>
          <NewsModern posts={beritaPosts} />
        </div>

        {/* AGENDA */}
        <div>
          <h2 className="text-2xl font-bold mb-4">📅 Agenda</h2>
          <AgendaSlider posts={agendaPosts} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

  {/* PENGUMUMAN (2/3) */}
  <div className="lg:col-span-2">
    <h2 className="text-2xl font-bold mb-4">📢 Pengumuman</h2>
    <AcademicAnnouncement />
  </div>

  {/* PRESTASI (1/3) */}
  {prestasi && (
    <div className="lg:col-span-1">
      <div className="rounded-2xl overflow-hidden shadow-xl h-full">
        <img
          src={getImage(prestasi)}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  )}

</div>

        {/* LINKS */}
        <PopularLinks />

        {/* PROFILE */}
        <div className="space-y-6">
          {ketua && (
            <ProfileCard
              label="Ketua Jurusan"
              name={ketua.title.rendered}
              image={getImage(ketua)}
              content={getContent(ketua)}
              color="green"
            />
          )}

          {sekretaris && (
            <ProfileCard
              label="Sekretaris Jurusan"
              name={sekretaris.title.rendered}
              image={getImage(sekretaris)}
              content={getContent(sekretaris)}
              color="orange"
            />
          )}

          {humas && (
            <ProfileCard
              label="Ketua Prodi Humas"
              name={humas.title.rendered}
              image={getImage(humas)}
              content={getContent(humas)}
              color="pink"
            />
          )}

          {jurnalistik && (
            <ProfileCard
              label="Ketua Prodi Jurnalistik"
              name={jurnalistik.title.rendered}
              image={getImage(jurnalistik)}
              content={getContent(jurnalistik)}
              color="orange"
            />
          )}
        </div>

      </section>
    </>
  );
}