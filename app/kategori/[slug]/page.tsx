import Image from "next/image";

export const revalidate = 60;

export default async function Page({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  try {
    // FETCH POST
    const res = await fetch(
      `https://cms.komunikasi.uinsgd.ac.id/wp-json/wp/v2/posts?slug=${slug}&_embed`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) {
      throw new Error("Failed fetch");
    }

    const data = await res.json();
    const post = data?.[0];

    if (!post) {
      return <div className="p-6">Berita tidak ditemukan</div>;
    }

    // IMAGE
    const image =
      post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
      "/no-image.jpg";

    // DATE
    const date = new Date(post.date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return (
      <main className="bg-gray-50 min-h-screen py-10">
        <article className="max-w-3xl mx-auto px-4">

          {/* JUDUL */}
          <h1
            className="text-2xl md:text-4xl font-bold text-gray-900 leading-tight mb-4"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />

          {/* META */}
          <div className="text-sm text-gray-500 mb-6">
            {date}
          </div>

          {/* IMAGE */}
          <div className="mb-8">
            <Image
              src={image}
              alt={post.title.rendered}
              width={800}
              height={450}
              className="w-full h-auto rounded-xl object-cover"
            />
          </div>

          {/* CONTENT */}
          <div
            className="
              text-gray-700 
              leading-relaxed
              [&>*]:mb-4
              [&>p]:mb-5
              [&>h2]:mt-8 [&>h2]:mb-4 [&>h2]:text-2xl [&>h2]:font-bold
              [&>h3]:mt-6 [&>h3]:mb-3 [&>h3]:text-xl [&>h3]:font-semibold
              [&>ul]:mb-5 [&>ul]:pl-5 [&>ul]:list-disc
              [&>ol]:mb-5 [&>ol]:pl-5 [&>ol]:list-decimal
              [&>figure]:mb-6
              [&_img]:rounded-xl
              [&>p>a]:text-blue-600 [&>p>a]:underline
            "
            dangerouslySetInnerHTML={{
              __html: post.content.rendered,
            }}
          />

        </article>
      </main>
    );
  } catch (error) {
    return (
      <div className="p-6 text-red-500">
        Terjadi kesalahan saat mengambil data
      </div>
    );
  }
}