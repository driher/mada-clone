"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";

export default function GaleriVideoPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [images, setImages] = useState<Record<number, string>>({});
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const startX = useRef(0);
  const endX = useRef(0);

  // AMBIL VIDEO DATA
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          "https://cms.komunikasi.uinsgd.ac.id/wp-json/wp/v2/posts?categories=99"
        );
        const data = await res.json();
        setPosts(data);

        const imgMap: Record<number, string> = {};

        await Promise.all(
          data.map(async (post: any) => {
            const mediaId = post.featured_media;

            if (!mediaId) {
              imgMap[post.id] = "/no-image.jpg";
              return;
            }

            try {
              const res = await fetch(
                `https://cms.komunikasi.uinsgd.ac.id/wp-json/wp/v2/media/${mediaId}`
              );
              const media = await res.json();

              imgMap[post.id] =
                media?.source_url ||
                media?.media_details?.sizes?.large?.source_url ||
                "/no-image.jpg";
            } catch {
              imgMap[post.id] = "/no-image.jpg";
            }
          })
        );

        setImages(imgMap);
      } catch {
        setPosts([]);
      }
    }

    fetchData();
  }, []);

  const open = (index: number) => setActiveIndex(index);
  const close = () => setActiveIndex(null);

  const next = () => {
    if (activeIndex === null) return;
    setActiveIndex((prev) =>
      prev === posts.length - 1 ? 0 : (prev ?? 0) + 1
    );
  };

  const prev = () => {
    if (activeIndex === null) return;
    setActiveIndex((prev) =>
      prev === 0 ? posts.length - 1 : (prev ?? 0) - 1
    );
  };

  // KEYBOARD
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (activeIndex === null) return;

      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex]);

  // SWIPE
  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    endX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = startX.current - endX.current;

    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
  };

  // EXTRACT VIDEO (YOUTUBE / IFRAME)
  function extractVideoSrc(html: string) {
    if (!html) return null;

    const match =
      html.match(/src="([^"]+)"/) ||
      html.match(/https:\/\/www\.youtube\.com\/embed\/[^\s"]+/) ||
      html.match(/https:\/\/www\.youtube\.com\/watch\?v=[^\s"]+/);

    if (!match) return null;

    let url = match[1] || match[0];

    // convert watch?v= ke embed
    if (url.includes("watch?v=")) {
      const id = url.split("v=")[1];
      url = `https://www.youtube.com/embed/${id}`;
    }

    return url;
  }

  const videoUrl = extractVideoSrc(
    posts[activeIndex!]?.content?.rendered || ""
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">

      {/* HEADER */}
      <section className="max-w-6xl mx-auto px-4 pt-10 pb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
          🎬 Galeri Video
        </h1>
        <p className="text-slate-500 mt-2">
          Dokumentasi video kegiatan dan publikasi
        </p>

        <div className="w-24 h-1 bg-red-500 rounded-full mt-4" />
      </section>

      {/* GRID */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

          {posts.map((post, index) => (
            <div
              key={post.id}
              onClick={() => open(index)}
              className="cursor-pointer group overflow-hidden rounded-xl border bg-white shadow-sm hover:shadow-lg transition"
            >
              {/* THUMBNAIL */}
              <div className="relative w-full h-40">
                <Image
                  src={images[post.id] || "/no-image.jpg"}
                  alt={post.title?.rendered || "Video"}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                />

                {/* PLAY ICON */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition">
                  <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center text-black text-xl">
                    ▶
                  </div>
                </div>
              </div>

              <div className="p-2">
                <p className="text-xs text-slate-700 line-clamp-2">
                  {post.title?.rendered}
                </p>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* POPUP VIDEO */}
      {activeIndex !== null && posts[activeIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={close}
        >
          {/* BACKDROP */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md animate-fadeIn" />

          {/* MODAL */}
          <div
            className="relative w-full max-w-4xl h-[80vh] px-4 animate-zoomIn"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >

            {/* CLOSE */}
            <button
              onClick={close}
              className="absolute top-2 right-2 text-white text-3xl z-50 hover:scale-110 transition"
            >
              ✕
            </button>

            {/* VIDEO */}
            <div className="relative w-full h-full">
              {videoUrl ? (
                <iframe
                  className="w-full h-full rounded-xl"
                  src={videoUrl}
                  title={posts[activeIndex].title?.rendered}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white">
                  Video tidak tersedia
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </main>
  );
}