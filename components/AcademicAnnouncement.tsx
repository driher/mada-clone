import Link from "next/link";

async function getPengumuman() {
  try {
    const res = await fetch(
      "https://mada.akarmusic.com/wp-json/wp/v2/posts?categories=65&_embed&per_page=1",
      { cache: "no-store" }
    );

    if (!res.ok) return null;

    const posts = await res.json();
    return posts?.[0] || null;
  } catch (e) {
    console.error("ERROR:", e);
    return null;
  }
}

export default async function AcademicAnnouncement() {
  const post = await getPengumuman();

  // ✅ FALLBACK (PASTI TAMPIL)
  if (!post) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <h2 className="text-xl font-bold mb-2">
            Pengumuman Akademik
          </h2>
          <p className="text-gray-500">
            Belum ada pengumuman terbaru.
          </p>
        </div>
      </section>
    );
  }

  const image =
    post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
    "https://via.placeholder.com/600x400?text=No+Image";

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-10 items-center bg-white rounded-2xl shadow p-6">

        {/* TEXT */}
        <div>
          <h2 className="text-3xl font-bold mb-4">
            Pengumuman Akademik
          </h2>

          <h3
            className="text-lg font-semibold mb-3"
            dangerouslySetInnerHTML={{
              __html: post.title.rendered,
            }}
          />

          <div
            className="text-gray-600 line-clamp-4 mb-6"
            dangerouslySetInnerHTML={{
              __html: post.excerpt.rendered,
            }}
          />

          <Link
            href={`/berita/${post.slug}`}
            className="inline-block text-orange-500 font-medium hover:underline"
          >
            Selengkapnya →
          </Link>
        </div>

        {/* IMAGE (AMAN PAKAI IMG) */}
        <div className="w-full h-[260px] md:h-[320px] rounded-xl overflow-hidden">
          <img
            src={image}
            alt={post.title.rendered}
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </section>
  );
}