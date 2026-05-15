import Link from "next/link";
import Image from "next/image";

export const revalidate = 60;

export default async function Page() {
  const res = await fetch(
    "https://cms.komunikasi.uinsgd.ac.id/wp-json/wp/v2/posts?categories=81&_embed&per_page=9",
    { next: { revalidate: 60 } }
  );

  const posts = await res.json();

  const getImage = (post: any) =>
    post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    "/no-image.jpg";

  return (
    <main className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-12">
      <section className="max-w-6xl mx-auto px-4">

        {/* HEADER */}
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            📰 Alumni
          </h2>
          <p className="text-gray-500 mt-2">
            Informasi seputar alumni
          </p>

          <div className="w-20 h-1 bg-orange-500 mt-4 rounded-full" />
        </div>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {posts?.map((post: any) => (
            <Link key={post.id} href={`/berita/${post.slug}`}>
              <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">

                {/* IMAGE */}
                <div className="relative w-full h-48 overflow-hidden">

                  <Image
                    src={getImage(post)}
                    alt={post.title.rendered}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                  {/* badge */}
                  <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow">
                    Berita
                  </div>

                </div>

                {/* CONTENT */}
                <div className="p-5">

                  <h3
                    className="font-semibold text-lg leading-snug line-clamp-2 group-hover:text-blue-600 transition"
                    dangerouslySetInnerHTML={{
                      __html: post.title.rendered,
                    }}
                  />

                  <div className="mt-4 flex items-center justify-between text-sm text-gray-500">

                    {/* DATE */}
                    <span>
                      📅{" "}
                      {new Date(post.date).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>

                    {/* READ MORE */}
                    <span className="text-blue-600 font-medium group-hover:underline">
                      Baca →
                    </span>

                  </div>

                </div>

              </div>
            </Link>
          ))}

        </div>

      </section>
    </main>
  );
}