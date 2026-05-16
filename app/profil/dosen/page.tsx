import Image from "next/image";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function Page() {
  const res = await fetch(
    "https://cms.komunikasi.uinsgd.ac.id/wp-json/wp/v2/pages?slug=dosen&_embed",
    { next: { revalidate: 60 } }
  );

  const data = await res.json();
  const page = data?.[0];

  if (!page) {
    return <div className="p-6">Halaman tidak ditemukan</div>;
  }

  // FEATURED IMAGE
  const image =
    page?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;

  return (
    <main className="bg-gray-50 min-h-screen py-10">
      <article className="max-w-4xl mx-auto px-4">

        {/* TITLE */}
        <h1
          className="text-3xl md:text-4xl font-bold text-slate-900 mb-6"
          dangerouslySetInnerHTML={{ __html: page.title.rendered }}
        />

        {/* FEATURED IMAGE */}
        {image && (
          <div className="mb-8">
            <Image
              src={image}
              alt={page.title?.rendered || "featured image"}
              width={1200}
              height={700}
              className="rounded-2xl w-full object-cover shadow-md"
              priority
            />
          </div>
        )}

        {/* CONTENT */}
        <div
          className="
            text-gray-700 leading-relaxed

            [&>*]:mb-4
            [&>p]:mb-5

            [&>h2]:mt-8
            [&>h2]:text-2xl
            [&>h2]:font-bold
            [&>h2]:text-slate-900

            [&>h3]:mt-6
            [&>h3]:text-xl
            [&>h3]:font-semibold
            [&>h3]:text-slate-800

            [&>ul]:pl-5
            [&>ul]:list-disc

            [&>ol]:pl-5
            [&>ol]:list-decimal

            [&_a]:text-pink-600
            [&_a]:underline

            /* TABLE */
            [&_table]:w-full
            [&_table]:min-w-[600px]
            [&_table]:border-collapse
            [&_table]:rounded-xl
            [&_table]:overflow-hidden
            [&_table]:border
            [&_table]:border-slate-200
            [&_table]:shadow-sm

            /* HEADER */
            [&_th]:bg-slate-800
            [&_th]:text-white
            [&_th]:font-semibold
            [&_th]:text-left
            [&_th]:p-3
            [&_th]:border
            [&_th]:border-slate-700

            /* CELL */
            [&_td]:p-3
            [&_td]:border
            [&_td]:border-slate-200

            /* ZEBRA */
            [&_tbody_tr:nth-child(odd)]:bg-slate-50
            [&_tbody_tr:nth-child(even)]:bg-white

            /* HOVER */
            [&_tbody_tr:hover]:bg-pink-50
            [&_tbody_tr]:transition-colors

            /* IMAGE INSIDE CONTENT */
            [&_img]:rounded-xl
            [&_img]:my-6
            [&_img]:shadow-sm

            /* IFRAME */
            [&_iframe]:w-full
            [&_iframe]:rounded-xl
            [&_iframe]:aspect-video
          "
        >
          <div className="overflow-x-auto">
            <div
              dangerouslySetInnerHTML={{
                __html: page.content.rendered,
              }}
            />
          </div>
        </div>

      </article>
    </main>
  );
}