"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function AgendaSlider() {
  const [posts, setPosts] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(
      "https://cms.komunikasi.uinsgd.ac.id/wp-json/wp/v2/posts?categories=63&_embed&per_page=8"
    )
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          console.error("WP API ERROR:", data);
          setPosts([]);
        }
      })
      .catch((err) => {
        console.error("FETCH ERROR:", err);
        setPosts([]);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!scrollRef.current || posts.length === 0) return;

      scrollRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });

      if (
        scrollRef.current.scrollLeft + scrollRef.current.clientWidth >=
        scrollRef.current.scrollWidth
      ) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [posts]);

  const getImage = (post: any) =>
    post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    "/no-image.jpg";

  return (
    <section className="max-w-6xl mx-auto px-4 mt-10">
      <h2 className="text-xl font-semibold mb-4">Agenda Terbaru</h2>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar"
      >
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/berita/${post.slug}`}
            className="min-w-[260px] max-w-[260px] bg-white rounded-xl shadow hover:shadow-lg transition"
          >
            <img
              src={getImage(post)}
              alt={post.title.rendered}
              className="w-full h-36 object-cover rounded-t-xl"
            />

            <div className="p-3">
              <h3
                className="text-sm font-medium leading-snug line-clamp-3"
                dangerouslySetInnerHTML={{
                  __html: post.title.rendered,
                }}
              />

              <p className="text-xs text-gray-400 mt-2">
                {new Date(post.date).toLocaleDateString("id-ID")}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}