export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // 1. ambil kategori
  const catRes = await fetch(
    `https://mada.akarmusic.com/wp-json/wp/v2/categories?slug=${slug}`
  );

  const catData = await catRes.json();
  const category = catData?.[0];

  if (!category) {
    return <div className="p-6">Kategori tidak ditemukan</div>;
  }

  // 2. ambil posts
  const res = await fetch(
    `https://mada.akarmusic.com/wp-json/wp/v2/posts?categories=${category.id}&_embed`,
    { cache: "no-store" }
  );

  const posts = await res.json();

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-6">
        Kategori: {category.name}
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post: any) => {
          const image =
            post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

          return (
            <a
              key={post.id}
              href={`/berita/${post.slug}`}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              {image && (
                <img
                  src={image}
                  className="w-full h-40 object-cover"
                  alt={post.title.rendered}
                />
              )}

              <div className="p-4">
                <h3
                  className="text-sm font-medium"
                  dangerouslySetInnerHTML={{
                    __html: post.title.rendered,
                  }}
                />
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}