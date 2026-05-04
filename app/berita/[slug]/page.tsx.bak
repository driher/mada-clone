export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const res = await fetch(
    `https://mada.akarmusic.com/wp-json/wp/v2/posts?slug=${slug}&_embed`,
    { cache: "no-store" }
  );

  const posts = await res.json();
  const post = posts?.[0];

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
    <article className="max-w-3xl mx-auto p-6">
      <h1
        className="text-2xl font-bold mb-4"
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />

      {image && (
        <img
          src={image}
          className="w-full rounded-lg mb-4"
          alt={post.title.rendered}
        />
      )}

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{
          __html: post.content.rendered,
        }}
      />
    </article>
  );
}