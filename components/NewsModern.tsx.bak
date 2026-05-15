import Link from "next/link";

export default function NewsModern({ posts }: any) {
  if (!posts || posts.length === 0) return null;

  // 🔥 FILTER BERITA (ID = 44)
  const beritaPosts = posts.filter((post: any) =>
    post.categories?.includes(44)
  );

  if (beritaPosts.length === 0) return null;

  const getImage = (post: any) =>
    post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    "/no-image.jpg";

  return (
    <section className="max-w-6xl mx-auto px-4 mt-10">
      <h2 className="text-orange-500 font-semibold text-xl mb-6">
        Berita Terbaru
      </h2>

      <div className="grid md:grid-cols-3 gap-6">

        {/* BERITA UTAMA */}
        {beritaPosts[0] && (
          <Link href={`/berita/${beritaPosts[0].slug}`}>
            <div className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer h-full">

              <img
                src={getImage(beritaPosts[0])}
                className="w-full h-80 object-cover"
              />

              <div className="p-5">
                <h3
                  className="text-xl font-semibold leading-snug"
                  dangerouslySetInnerHTML={{
                    __html: beritaPosts[0].title.rendered,
                  }}
                />
              </div>

            </div>
          </Link>
        )}

        {/* GRID KANAN */}
        <div className="grid grid-cols-2 gap-6 md:col-span-2">

          {beritaPosts.slice(1, 5).map((post: any) => (
            <Link key={post.id} href={`/berita/${post.slug}`}>
              <div className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer">

                <img
                  src={getImage(post)}
                  className="w-full h-32 object-cover"
                />

                <div className="p-3">
                  <h3
                    className="text-sm font-medium leading-snug line-clamp-3"
                    dangerouslySetInnerHTML={{
                      __html: post.title.rendered,
                    }}
                  />
                </div>

              </div>
            </Link>
          ))}

        </div>

      </div>
    </section>
  );
}