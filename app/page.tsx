import HeroSlider from "@/components/HeroSlider";
import PopularLinks from "@/components/PopularLinks";
import ProfileCard from "@/components/ProfileCard";
import AcademicAnnouncement from "@/components/AcademicAnnouncement";
import NewsModern from "@/components/NewsModern";
import AgendaSlider from "@/components/AgendaSlider";

import {
  getHeroPosts,
  getBeritaAgenda,
  getKetuaJurusan,
  getSekretarisJurusan,
  getProdiHumas,
  getProdiJurnalistik,
} from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function Home() {
  const heroPosts = await getHeroPosts().catch(() => []);
  const posts = await getBeritaAgenda().catch(() => []);

  const ketua = await getKetuaJurusan().catch(() => null);
  const sekretaris = await getSekretarisJurusan().catch(() => null);

  const humas = await getProdiHumas().catch(() => null);
  const jurnalistik = await getProdiJurnalistik().catch(() => null);

  const getImage = (post: any) =>
    post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    "/no-image.jpg";

  const getContent = (post: any) => {
    const text = (
      post?.content?.rendered ||
      post?.excerpt?.rendered ||
      ""
    )
      .replace(/<[^>]*>/g, "")
      .trim();

    return text.length > 300
      ? text.slice(0, 300).replace(/\s+\S*$/, "") + "..."
      : text;
  };

  return (
    <main className="bg-gray-100 min-h-screen">

      {/* HERO */}
      <section className="mb-10">
        <HeroSlider posts={heroPosts} />
      </section>

      {/* BERITA */}
      <section className="mb-12">
        <div className="max-w-6xl mx-auto px-4">
          <NewsModern posts={posts} />
        </div>
      </section>

      {/* AGENDA */}
      <section className="mb-12">
        <AgendaSlider />
      </section>

      {/* PENGUMUMAN */}
      <AcademicAnnouncement />

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
  );
}