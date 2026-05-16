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

  const res = await fetch(
    `https://cms.komunikasi.uinsgd.ac.id/wp-json/wp/v2/posts?slug=${slug}&_embed`,
    { cache: "no-store" }
  );

  const posts = await res.json();
  const post = posts?.[0];

  if (!post) return notFound();

  const relatedRes = await fetch(
    `https://cms.komunikasi.uinsgd.ac.id/wp-json/wp/v2/posts?categories=44&_embed&per_page=6`,
    { cache: "no-store" }
  );

  const relatedPosts = await relatedRes.json();

  const image =
    post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    "https://komunikasi.uinsgd.ac.id/no-image.jpg";

  const url = `https://komunikasi.uinsgd.ac.id/berita/${slug}`;

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(post.title.rendered);

  return (
    <article className="max-w-6xl mx-auto p-6">

      {/* ================= GOOGLE NEWS SCHEMA ================= */}
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
              "@type": "Organization",
              name: "Ilmu Komunikasi UIN Bandung",
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

        {/* ================= SHARE (DESKTOP + MOBILE RESPONSIVE) ================= */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">

          <span className="text-sm font-medium text-gray-600">
            Bagikan:
          </span>

          {/* ================= DESKTOP ================= */}
          <div className="hidden md:flex items-center gap-3">

            {/* WHATSAPP */}
            <a
              href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
              target="_blank"
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition"
            >
              <svg width="18" height="18" viewBox="0 0 32 32" fill="currentColor">
                <path d="M19.11 17.53c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.12-.41-2.13-1.3-.79-.7-1.32-1.56-1.48-1.83-.16-.27-.02-.42.12-.56.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27s.98 2.63 1.12 2.81c.14.18 1.94 2.96 4.7 4.15.66.28 1.18.45 1.58.58.66.21 1.26.18 1.73.11.53-.08 1.6-.65 1.83-1.28.23-.63.23-1.18.16-1.28-.07-.1-.25-.16-.52-.3z"/>
                <path d="M16 3C8.82 3 3 8.82 3 16c0 2.3.6 4.54 1.75 6.5L3 29l6.7-1.7C11.58 28.4 13.76 29 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3zm0 24c-2.02 0-3.98-.54-5.68-1.56l-.41-.25-3.98 1.01 1.06-3.87-.27-.4A10.9 10.9 0 0 1 5 16C5 9.93 9.93 5 16 5s11 4.93 11 11-4.93 11-11 11z"/>
              </svg>
              WhatsApp
            </a>

            {/* FACEBOOK */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
              target="_blank"
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12"/>
              </svg>
              Facebook
            </a>

            {/* TELEGRAM */}
            <a
              href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`}
              target="_blank"
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-sky-500 text-white hover:bg-sky-600 transition"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.04 15.54 8.9 19.1c.41 0 .59-.18.81-.4l1.95-1.87 4.04 2.96c.74.41 1.27.2 1.46-.68l2.66-12.48c.27-1.22-.44-1.7-1.2-1.42L3.6 9.24c-1.2.47-1.18 1.14-.2 1.44l4.86 1.52L19.5 6.3c.55-.35 1.05-.16.64.21"/>
              </svg>
              Telegram
            </a>

            {/* THREADS */}
            <a
              href={`https://www.threads.net/intent/post?text=${encodedTitle}%20${encodedUrl}`}
              target="_blank"
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.5 8.5c-.9-2.2-2.7-3.5-5.1-3.5-3.8 0-6.4 3-6.4 7s2.6 7 6.4 7c3.5 0 5.9-2.3 6.3-5.8h-2.2c-.3 2.3-1.8 3.8-4.1 3.8-2.7 0-4.4-2.1-4.4-5s1.7-5 4.4-5c1.7 0 3 .8 3.7 2.3h2.4z"/>
              </svg>
              Threads
            </a>


          </div>

          {/* ================= MOBILE ================= */}
          <div className="flex md:hidden items-center gap-2">

            {/* WhatsApp */}
            <a
              href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
              target="_blank"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-green-500 text-white"
              aria-label="WhatsApp"
            >
              <svg width="18" height="18" viewBox="0 0 32 32" fill="currentColor">
                <path d="M19.11 17.53c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.12-.41-2.13-1.3-.79-.7-1.32-1.56-1.48-1.83-.16-.27-.02-.42.12-.56.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27s.98 2.63 1.12 2.81c.14.18 1.94 2.96 4.7 4.15.66.28 1.18.45 1.58.58.66.21 1.26.18 1.73.11.53-.08 1.6-.65 1.83-1.28.23-.63.23-1.18.16-1.28-.07-.1-.25-.16-.52-.3z"/>
              </svg>
            </a>

            {/* Facebook */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
              target="_blank"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-600 text-white"
              aria-label="Facebook"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12"/>
              </svg>
            </a>

            {/* Telegram */}
            <a
              href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`}
              target="_blank"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-sky-500 text-white"
              aria-label="Telegram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.04 15.54 8.9 19.1c.41 0 .59-.18.81-.4l1.95-1.87 4.04 2.96c.74.41 1.27.2 1.46-.68l2.66-12.48c.27-1.22-.44-1.7-1.2-1.42L3.6 9.24c-1.2.47-1.18 1.14-.2 1.44l4.86 1.52L19.5 6.3c.55-.35 1.05-.16.64.21"/>
              </svg>
            </a>

            {/* Threads */}
            <a
              href={`https://www.threads.net/intent/post?text=${encodedTitle}%20${encodedUrl}`}
              target="_blank"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-black text-white"
              aria-label="Threads"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.5 8.5c-.9-2.2-2.7-3.5-5.1-3.5-3.8 0-6.4 3-6.4 7s2.6 7 6.4 7c3.5 0 5.9-2.3 6.3-5.8h-2.2c-.3 2.3-1.8 3.8-4.1 3.8-2.7 0-4.4-2.1-4.4-5s1.7-5 4.4-5c1.7 0 3 .8 3.7 2.3h2.4z"/>
              </svg>
            </a>

          </div>

        </div>

        {/* IMAGE */}
        <img
          src={image}
          alt={post.title.rendered}
          className="w-full rounded-xl mb-6"
        />

        {/*    CONTENT   */}
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