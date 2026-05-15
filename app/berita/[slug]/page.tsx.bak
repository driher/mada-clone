export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // DETAIL POST
  const res = await fetch(
    `https://cms.komunikasi.uinsgd.ac.id/wp-json/wp/v2/posts?slug=${slug}&_embed`,
    { cache: "no-store" }
  );

  const posts = await res.json();
  const post = posts?.[0];

  // RELATED POSTS
  const relatedRes = await fetch(
    `https://cms.komunikasi.uinsgd.ac.id/wp-json/wp/v2/posts?categories=44&_embed&per_page=6`,
    { cache: "no-store" }
  );

  const relatedPosts = await relatedRes.json();

  if (!post) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold">Berita tidak ditemukan</h1>
      </div>
    );
  }

  const image =
    post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return (
    <article className="max-w-6xl mx-auto p-6">
      {/* DETAIL ARTIKEL */}
      <div className="max-w-3xl mx-auto">
        <h1
          className="text-2xl md:text-4xl font-bold mb-4 leading-tight"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />

        {image && (
          <img
            src={image}
            className="w-full rounded-xl mb-6"
            alt={post.title.rendered}
          />
        )}

        <div
          className="
            text-gray-700 leading-relaxed

            [&>*]:mb-4
            [&>p]:mb-5

            [&>h2]:mt-8 [&>h2]:mb-4 [&>h2]:text-2xl [&>h2]:font-bold
            [&>h3]:mt-6 [&>h3]:mb-3 [&>h3]:text-xl [&>h3]:font-semibold

            [&>ul]:mb-5 [&>ul]:pl-5 [&>ul]:list-disc
            [&>ol]:mb-5 [&>ol]:pl-5 [&>ol]:list-decimal

            [&_img]:rounded-xl
            [&_img]:w-full

            [&>p>a]:text-orange-500 [&>p>a]:underline
          "
          dangerouslySetInnerHTML={{
            __html: post.content.rendered,
          }}
        />
      </div>

      {/* BACA JUGA */}
      <section className="max-w-3xl mx-auto mt-16">
        <h4 className="text-lg md:text-xl font-bold mb-6 border-l-4 border-cyan-600 pl-3">
          Baca Juga Berita Lainnya:
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedPosts
            ?.filter((item: any) => item.slug !== slug)
            ?.slice(0, 6)
            ?.map((item: any) => {
              const thumb =
                item?._embedded?.["wp:featuredmedia"]?.[0]
                  ?.source_url;

              return (
                <a
                  key={item.id}
                  href={`/berita/${item.slug}`}
                  className="group block"
                >
                  <div className="overflow-hidden rounded-xl mb-4 bg-gray-100">
                    {thumb ? (
                      <img
                        src={thumb}
                        alt={item.title.rendered}
                        className="
                          w-full
                          h-[220px]
                          object-cover
                          transition-transform
                          duration-300
                          group-hover:scale-105
                        "
                      />
                    ) : (
                      <div className="w-full h-[220px] bg-gray-200" />
                    )}
                  </div>

                  <div className="mb-3">
                    <span className="bg-cyan-700 text-white text-xs font-semibold px-3 py-1 rounded">
                      Berita
                    </span>
                  </div>

                 <h5
  className="font-bold text-[17px] leading-snug line-clamp-2"
  dangerouslySetInnerHTML={{
    __html: post.title.rendered,
  }}
/>

                  <div className="text-sm text-gray-500">
                    {new Date(item.date).toLocaleDateString("id-ID", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                </a>
              );
            })}
        </div>
      </section>
    </article>
  );
}