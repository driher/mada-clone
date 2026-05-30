"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type Post = {
  id: number;
  title: {
    rendered: string;
  };
  slug: string;
  _embedded?: any;
};

export default function BigHeroSlider() {
  const [slides, setSlides] = useState<Post[]>([]);
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch(
          "https://cms.komunikasi.uinsgd.ac.id/wp-json/wp/v2/posts?_embed=wp:featuredmedia&categories=43&per_page=10&orderby=date&order=desc",
          {
            cache: "no-store",
          }
        );

        const data = await res.json();

        setSlides(Array.isArray(data) ? data : []);
      } catch {
        setSlides([]);
      }
    };

    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setIndex((prev) => (prev + 1) % slides.length);
      }, 6000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [slides, isPaused]);

  const getImage = (post: any) => {
    const media = post?._embedded?.["wp:featuredmedia"]?.[0];

    return (
      media?.media_details?.sizes?.full?.source_url ||
      media?.media_details?.sizes?.large?.source_url ||
      media?.source_url ||
      "/no-image.jpg"
    );
  };

  const prev = () =>
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  const next = () =>
    setIndex((prev) => (prev + 1) % slides.length);

  if (!slides.length) {
    return (
      <div className="w-full h-[560px] bg-slate-200 animate-pulse rounded-2xl" />
    );
  }

  return (
    <section
      className="relative overflow-hidden rounded-2xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ARROW LEFT */}
      <button
        onClick={prev}
        className="
          absolute
          left-0
          top-1/2
          -translate-y-1/2
          z-40
          w-14
          h-14
          rounded-r-full
          bg-black/30
          backdrop-blur
          text-white
          text-3xl
          hover:bg-black/50
          transition
        "
      >
        ‹
      </button>

      {/* ARROW RIGHT */}
      <button
        onClick={next}
        className="
          absolute
          right-0
          top-1/2
          -translate-y-1/2
          z-40
          w-14
          h-14
          rounded-l-full
          bg-black/30
          backdrop-blur
          text-white
          text-3xl
          hover:bg-black/50
          transition
        "
      >
        ›
      </button>

      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          width: `${slides.length * 100}%`,
          transform: `translateX(-${index * (100 / slides.length)}%)`,
        }}
      >
        {slides.map((post, slideIndex) => (
          <div
            key={post.id}
            className="relative flex-shrink-0"
            style={{
              width: `${100 / slides.length}%`,
            }}
          >
            <div className="relative h-[560px]">
              {/* IMAGE */}
             <img
  src={getImage(post)}
  alt={post.title.rendered}
  className="absolute inset-0 w-full h-full object-contain"
  style={{
    transition: "all .5s ease",
  }}
/>

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#071A52]/95 via-[#08285e]/75 to-transparent" />

              {/* CONTENT */}
              <div className="absolute inset-0 z-20 flex items-center">
                <div className="max-w-3xl px-8 md:px-16 text-white">
                  <div className="uppercase tracking-wider font-bold text-yellow-400 text-sm md:text-lg">
                    Program Studi
                  </div>

                  <h1 className="mt-2 text-4xl md:text-7xl font-black leading-tight">
                    ILMU KOMUNIKASI
                  </h1>

                  <div className="mt-2 text-yellow-400 font-bold text-lg md:text-3xl">
                    UIN SUNAN GUNUNG DJATI BANDUNG
                  </div>

                  <p className="mt-5 text-base md:text-xl text-white/90 max-w-2xl">
                    Mencetak komunikator, jurnalis, dan praktisi media
                    yang berintegritas di era digital.
                  </p>

                  {/* FEATURES */}
                  <div className="flex flex-wrap gap-6 mt-8 text-sm md:text-base">
                    <div>
                      🏅
                      <br />
                      Akreditasi
                      <br />
                      Unggul
                    </div>

                    <div>
                      💻
                      <br />
                      Laboratorium
                      <br />
                      Media Modern
                    </div>

                    <div>
                      🎙️
                      <br />
                      Radio
                      <br />
                      Akademika
                    </div>

                    <div>
                      🤝
                      <br />
                      Jejaring
                      <br />
                      Industri
                    </div>
                  </div>

                  {/* BUTTONS */}
                  <div className="flex flex-wrap gap-4 mt-10">
                    <Link
                      href="/profil"
                      className="
                        px-7
                        py-3
                        rounded-xl
                        bg-yellow-500
                        text-slate-900
                        font-bold
                        hover:bg-yellow-400
                        transition
                      "
                    >
                      Profil Prodi
                    </Link>

                    <Link
                      href="/https://damba.uinsgd.ac.id/auth/login"
                      className="
                        px-7
                        py-3
                        rounded-xl
                        border
                        border-white/30
                        bg-white/10
                        backdrop-blur
                        hover:bg-white/20
                        transition
                      "
                    >
                      Informasi Pendaftaran
                    </Link>
                  </div>
                </div>
              </div>

              {/* DOTS */}
              <div className="absolute bottom-6 right-6 z-30">
                <div className="flex gap-2 bg-black/30 backdrop-blur px-4 py-3 rounded-full">
                  {slides.map((_, dotIndex) => (
                    <button
                      key={dotIndex}
                      onClick={() => setIndex(dotIndex)}
                      className={`transition-all rounded-full ${
                        index === dotIndex
                          ? "w-8 h-2 bg-yellow-400"
                          : "w-2 h-2 bg-white/60"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}