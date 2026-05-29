"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Post = {
  id: number;
  title: { rendered: string };
  _embedded?: any;
};

export default function BigHeroSlider() {
  const [slides, setSlides] = useState<Post[]>([]);
  const [index, setIndex] = useState(0);
  const touchStartX = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // FETCH
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch(
          "https://cms.komunikasi.uinsgd.ac.id/wp-json/wp/v2/posts?_embed&categories=43&per_page=8&orderby=date&order=desc",
          { cache: "no-store" }
        );

        const data = await res.json();
        setSlides(Array.isArray(data) ? data : []);
      } catch {
        setSlides([]);
      }
    };

    fetchSlides();
  }, []);

  // AUTO SLIDE
  useEffect(() => {
    if (slides.length <= 1) return;

    intervalRef.current = setInterval(() => {
      setIndex((p) => (p + 1) % slides.length);
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [slides]);

  // TOUCH
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const endX = e.changedTouches[0].clientX;

    if (touchStartX.current - endX > 50) setIndex((p) => (p + 1) % slides.length);
    if (endX - touchStartX.current > 50)
      setIndex((p) => (p === 0 ? slides.length - 1 : p - 1));
  };

  const getImage = (post: any) => {
    return (
      post?._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes
        ?.large?.source_url ||
      post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
      "/no-image.jpg"
    );
  };

  if (!slides.length) {
    return (
      <div className="w-full h-[220px] md:h-[420px] bg-gray-200 animate-pulse" />
    );
  }

  return (
    <section
      className="relative w-full overflow-hidden bg-black"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* TRACK */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          width: `${slides.length * 100}%`,
          transform: `translateX(-${index * (100 / slides.length)}%)`,
        }}
      >
        {slides.map((post, i) => (
          <div
            key={post.id}
            className="relative w-full flex-shrink-0"
            style={{ width: `${100 / slides.length}%` }}
          >
            {/* IMAGE WRAPPER */}
            <div className="relative w-full h-[240px] sm:h-[320px] md:h-[450px] lg:h-[550px] overflow-hidden bg-black">

  <Image
    src={getImage(post)}
    alt={post.title.rendered}
    fill
    priority={i === 0}
    loading={i === 0 ? "eager" : "lazy"}
    sizes="100vw"
    className="object-cover object-center scale-105"
  />

</div>
          </div>
        ))}
      </div>

      {/* NAV */}
      <button
        onClick={() =>
          setIndex((p) => (p === 0 ? slides.length - 1 : p - 1))
        }
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/70 w-9 h-9 rounded-full"
      >
        ❮
      </button>

      <button
        onClick={() => setIndex((p) => (p + 1) % slides.length)}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/70 w-9 h-9 rounded-full"
      >
        ❯
      </button>
    </section>
  );
}