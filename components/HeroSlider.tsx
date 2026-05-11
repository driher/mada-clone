"use client";

import { useEffect, useState, useRef } from "react";

export default function HeroSlider({ posts }: any) {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef<any>(null);

  const length = posts?.length || 0;

  // 🔥 AUTO SLIDE
  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % length);
    }, 4000);

    return () => resetTimeout();
  }, [index, length]);

  function resetTimeout() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }

  // 🔥 SWIPE
  let startX = 0;

  const handleTouchStart = (e: any) => {
    startX = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: any) => {
    const endX = e.changedTouches[0].clientX;

    if (startX - endX > 50) {
      nextSlide();
    } else if (endX - startX > 50) {
      prevSlide();
    }
  };

  // 🔥 NAVIGATION
  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + length) % length);
  };

  const getImage = (post: any) => {
  let img =
    post?._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes
      ?.medium_large?.source_url ||
    post?._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes
      ?.large?.source_url ||
    post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  if (img) img = img.replace("http://", "https://");

  return (
    img ||
    "https://mada.akarmusic.com/wp-content/uploads/2026/04/selamat-1-1-1140x570.jpeg"
  );
};

  if (!posts || posts.length === 0) {
    return <div className="h-[250px] bg-gray-300">No Hero</div>;
  }

  return (
    <div
      className="relative w-full h-[250px] md:h-[420px] overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* SLIDES */}
      <div
        className="flex transition-transform duration-700"
        style={{
          transform: `translateX(-${index * 100}%)`,
        }}
      >
        {posts.map((post: any, i: number) => (
          <div key={i} className="w-full flex-shrink-0 relative">
         <img
  src={getImage(post)}
  loading={i === 0 ? "eager" : "lazy"}
  fetchPriority={i === 0 ? "high" : "low"}
  className="w-full h-[250px] md:h-[420px] object-cover"
/>

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/60 via-pink-400/60 to-purple-500/60" />
          </div>
        ))}
      </div>

      {/* 🔥 BUTTON < */}
      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white px-3 py-2 rounded-full"
      >
        {"<"}
      </button>

      {/* 🔥 BUTTON > */}
      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white px-3 py-2 rounded-full"
      >
        {">"}
      </button>

      {/* 🔥 DOTS */}
      <div className="absolute bottom-3 w-full flex justify-center gap-2">
        {posts.map((_: any, i: number) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}