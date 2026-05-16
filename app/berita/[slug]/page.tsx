import { notFound } from "next/navigation";

export const revalidate = 60;

/* ================= SEO ================= */
export async function generateMetadata({ params }: any) {
  const { slug } = await params;

  const res = await fetch(
    `https://cms.komunikasi.uinsgd.ac.id/wp-json/wp/v2/posts?slug=${slug}&_embed`,
    { cache: "no-store" }
  );

  const posts = await res.json();
  const post = posts?.[0];

  if (!post) {
    return {
      title: "Berita tidak ditemukan",
      description: "Konten tidak tersedia",
    };
  }

  const title = post?.title?.rendered || "Ilmu Komunikasi UIN Bandung";

  const description =
    post?.excerpt?.rendered?.replace(/<[^>]*>/g, "") ||
    post?.content?.rendered?.replace(/<[^>]*>/g, "").slice(0, 160);

  const image =
    post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    "https://komunikasi.uinsgd.ac.id/no-image.jpg";

  const url = `https://komunikasi.uinsgd.ac.id/berita/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      siteName: "Ilmu Komunikasi UIN Bandung",
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

/* ================= PAGE ================= */
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  /* ================= FETCH POST ================= */
  const res = await fetch(
    `https://cms.komunikasi.uinsgd.ac.id/wp-json/wp/v2/posts?slug=${slug}&_embed`,
    { cache: "no-store" }
  );

  const posts = await res.json();
  const post = posts?.[0];

  if (!post) return notFound();

/* ✅ TAMBAHKAN INI */
const url = `https://komunikasi.uinsgd.ac.id/berita/${slug}`;

const encodedUrl = encodeURIComponent(url);
const encodedTitle = encodeURIComponent(post.title.rendered);

  /* ================= AUTHOR ================= */
  const author =
    post?._embedded?.author?.[0]?.name || "Admin";

  /* ================= RELATED POSTS ================= */
  const relatedRes = await fetch(
    `https://cms.komunikasi.uinsgd.ac.id/wp-json/wp/v2/posts?categories=44&_embed&per_page=6`,
    { cache: "no-store" }
  );

  const relatedPosts = await relatedRes.json();

  const image =
    post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    "https://komunikasi.uinsgd.ac.id/no-image.jpg";

  const url = `https://komunikasi.komunikasi.uinsgd.ac.id/berita/${slug}`;

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(post.title.rendered);

  return (
    <article className="max-w-6xl mx-auto p-6">

      {/* ================= SCHEMA ================= */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: post.title.rendered,
            image: image ? [image] : [],
            datePublished: post.date,
            dateModified: post.modified || post.date,
            mainEntityOfPage: url,
            author: {
              "@type": "Person",
              name: author,
            },
            publisher: {
              "@type": "Organization",
              name: "Ilmu Komunikasi UIN Bandung",
              logo: {
                "@type": "ImageObject",
                url: "https://komunikasi.uinsgd.ac.id/logo.png",
              },
            },
          }),
        }}
      />

      {/* ================= CONTENT ================= */}
      <div className="max-w-3xl mx-auto">

        {/* TITLE */}
        <h1
          className="text-2xl md:text-4xl font-bold mb-4 leading-tight"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />

        {/* DATE + AUTHOR */}
        <div className="mt-2 mb-4 text-sm text-gray-500 space-y-1">

          <div className="flex items-center gap-2">
            <span>
              {new Date(post.date).toLocaleDateString("id-ID", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>

            <span className="text-gray-300">•</span>

            <span>
              Update:{" "}
              {new Date(post.modified || post.date).toLocaleDateString(
                "id-ID",
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }
              )}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span>✍️</span>
            <span>{author}</span>
          </div>
        </div>

        {/* IMAGE */}
        <img
          src={image}
          alt={post.title.rendered}
          className="w-full rounded-xl mb-6"
        />

        {/* CONTENT */}
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

      {/* ================= RELATED ================= */}
      <section className="max-w-6xl mx-auto mt-20 px-4">
        <h4 className="text-xl md:text-2xl font-bold border-l-4 border-cyan-600 pl-4 mb-8">
          Baca Juga:
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedPosts
            ?.filter((item: any) => item.slug !== slug)
            ?.slice(0, 6)
            ?.map((item: any) => {
              const thumb =
                item?._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

              return (
                <a
                  key={item.id}
                  href={`/berita/${item.slug}`}
                  className="block rounded-2xl overflow-hidden bg-white hover:-translate-y-1 transition"
                >
                  <img
                    src={thumb || image}
                    className="w-full h-[260px] object-cover"
                  />

                  <div className="p-4">
                    <h5
                      className="font-bold line-clamp-2"
                      dangerouslySetInnerHTML={{
                        __html: item.title.rendered,
                      }}
                    />
                  </div>
                </a>
              );
            })}
        </div>
      </section>

    </article>
  );
}


   