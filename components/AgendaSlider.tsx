"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

interface AgendaSliderProps {
  posts?: any[];
}

export default function AgendaSlider({
  posts = [],
}: AgendaSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto Scroll
  useEffect(() => {
    if (!posts.length) return;

    const interval = setInterval(() => {
      const container = scrollRef.current;
      if (!container) return;

      container.scrollBy({
        left: 280,
        behavior: "smooth",
      });

      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth - 50
      ) {
        setTimeout(() => {
          container.scrollTo({
            left: 0,
            behavior: "smooth",
          });
        }, 800);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [posts]);

  const getImage = (post: any) =>
    post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    "/no-image.jpg";

  return (
    <section className="w-full">

      {posts.length === 0 ? (
        <p className="text-sm text-gray-500">
          Tidak ada agenda tersedia
        </p>
      ) : (
        <div
          ref={scrollRef}
          className="
            grid
            grid-rows-2
            grid-flow-col
            gap-4
            overflow-x-auto
            scroll-smooth
            no-scrollbar
            pb-2
          "
        >
          {posts.map((post: any) => (
            <Link
              key={post.id}
              href={`/agenda/${post.slug}`}
              className="
                w-[260px]
                bg-white
                rounded-xl
                overflow-hidden
                shadow-sm
                hover:shadow-lg
                transition-all
                duration-300
              "
            >
              <img
                src={getImage(post)}
                alt={post.title.rendered}
                className="w-full h-36 object-cover"
              />

              <div className="p-3">
                <h3
                  className="text-sm font-semibold leading-snug line-clamp-2 min-h-[40px]"
                  dangerouslySetInnerHTML={{
                    __html: post.title.rendered,
                  }}
                />

                <p className="text-xs text-gray-500 mt-2">
                  {new Date(post.date).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}