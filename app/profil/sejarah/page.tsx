import Image from "next/image";

export const revalidate = 60;

export default async function Page() {
  const res = await fetch(
    "https://cms.komunikasi.uinsgd.ac.id/wp-json/wp/v2/pages?slug=sejarah-program-studi-ilmu-komunikasi&_embed",
    { next: { revalidate: 60 } }
  );

  const data = await res.json();
  const page = data?.[0];

  if (!page) {
    return <div className="p-6">Halaman tidak ditemukan</div>;
  }

  // IMAGE (kalau ada featured image)
  const image =
    page?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    null;

  return (
    <main className="bg-gray-50 min-h-screen py-10">
      <article className="max-w-3xl mx-auto px-4">

        {/* JUDUL */}
        <h1
          className="text-3xl md:text-4xl font-bold mb-6"
          dangerouslySetInnerHTML={{ __html: page.title.rendered }}
        />

        {/* IMAGE */}
        {image && (
          <div className="mb-8">
            <Image
              src={image}
              alt="sejarah"
              width={800}
              height={450}
              className="rounded-xl w-full object-cover"
            />
          </div>
        )}

        {/* CONTENT */}
        <div
          className="
            text-gray-700 leading-relaxed
            [&>*]:mb-4
            [&>p]:mb-5
            [&>h2]:mt-8 [&>h2]:text-2xl [&>h2]:font-bold
            [&>h3]:mt-6 [&>h3]:text-xl [&>h3]:font-semibold
            [&>ul]:pl-5 [&>ul]:list-disc
          "
          dangerouslySetInnerHTML={{
            __html: page.content.rendered,
          }}
        />

      </article>
    </main>
  );
}