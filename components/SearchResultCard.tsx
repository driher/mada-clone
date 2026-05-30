import Link from "next/link";
import Image from "next/image";

/* =========================
   TYPES
========================= */
interface Post {
  id: number;
  slug: string;

  title?: {
    rendered?: string;
  };

  excerpt?: {
    rendered?: string;
  };

  _embedded?: {
    ["wp:featuredmedia"]?: {
      source_url?: string;
    }[];
  };
}

interface Props {
  post: Post;
}

/* =========================
   COMPONENT
========================= */
export default function SearchResultCard({
  post,
}: Props) {

  const image =
    post?._embedded?.["wp:featuredmedia"]?.[0]
      ?.source_url || "/hero.jpg";

  return (
    <Link
      href={`/news/${post.slug}`}
      className="
        group
        flex
        gap-4
        rounded-2xl
        border
        border-gray-100
        bg-white
        p-4
        transition-all
        hover:-translate-y-1
        hover:shadow-lg
      "
    >

      {/* IMAGE */}
      <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-xl">

        <Image
          src={image}
          alt={
            post?.title?.rendered ||
            "MES Jabar"
          }
          fill
          sizes="120px"
          className="object-cover transition duration-300 group-hover:scale-105"
        />

      </div>

      {/* CONTENT */}
      <div className="min-w-0 flex-1">

        <h3
          className="
            line-clamp-2
            font-bold
            text-gray-900
            transition-colors
            group-hover:text-emerald-600
          "
          dangerouslySetInnerHTML={{
            __html:
              post?.title?.rendered ||
              "Tanpa Judul",
          }}
        />

        <div
          className="
            mt-2
            line-clamp-2
            text-sm
            text-gray-500
          "
          dangerouslySetInnerHTML={{
            __html:
              post?.excerpt?.rendered || "",
          }}
        />

      </div>

    </Link>
  );
}