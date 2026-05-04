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
            className="
            text-gray-700 leading-relaxed

            [&>*]:mb-4
            [&>p]:mb-5

            [&>h2]:mt-8 [&>h2]:mb-4 [&>h2]:text-2xl [&>h2]:font-bold
            [&>h3]:mt-6 [&>h3]:mb-3 [&>h3]:text-xl [&>h3]:font-semibold

            [&>ul]:mb-5 [&>ul]:pl-5 [&>ul]:list-disc
            [&>ol]:mb-5 [&>ol]:pl-5 [&>ol]:list-decimal

            [&_img]:rounded-xl
            [&>p>a]:text-orange-500 [&>p>a]:underline
          "
          dangerouslySetInnerHTML={{
            __html: post.content.rendered,
        }}
      />
    </article>
  );
}