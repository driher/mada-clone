"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function HeroHeadlineSlider() {
  const [posts, setPosts] = useState([]);
  const [active, setActive] = useState(0);

  // GANTI DENGAN DOMAIN WP ANDA
  const API_URL =
    "https://cms.ilkom.stebi-aljabar.ac.id/wp-json/wp/v2/posts?categories=60&_embed&per_page=5";

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
  }, []);

  // autoplay
  useEffect(() => {
    if (!posts.length) return;

    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % posts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [posts]);

  const nextSlide = () => {
    setActive((prev) => (prev + 1) % posts.length);
  };

  const prevSlide = () => {
    setActive((prev) => (prev - 1 + posts.length) % posts.length);
  };

  if (!posts.length) {
    return (
      <div className="hero-loading">
        Loading headline...
      </div>
    );
  }

  return (
    <section className="hero-slider">
      {posts.map((post, index) => {
        const image =
          post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
          "/noimage.jpg";

        const isActive = index === active;

        return (
          <div
            key={post.id}
            className={`hero-slide ${isActive ? "active" : ""}`}
          >
            <Image
              src={image}
              alt={post.title.rendered}
              fill
              priority
              className="hero-image"
            />

            <div className="hero-overlay"></div>

            <div className="hero-content">
              <div className="headline-badge">
                <span className="dot"></span>
                HEADLINE NEWS
              </div>

              <div className="hero-category">
                {post?._embedded?.["wp:term"]?.[0]?.[0]?.name || "Headline"}
              </div>

              <h1
                dangerouslySetInnerHTML={{
                  __html: post.title.rendered,
                }}
              />

              <p
                dangerouslySetInnerHTML={{
                  __html:
                    post.excerpt.rendered.replace(/<[^>]+>/g, "").slice(0, 220) +
                    "...",
                }}
              />

              <div className="hero-meta">
                <span>
                  {post?._embedded?.author?.[0]?.name || "Admin"}
                </span>

                <span>
                  {new Date(post.date).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>

              <Link href={`/post/${post.slug}`} className="hero-link">
                Baca Selengkapnya
              </Link>
            </div>
          </div>
        );
      })}

      {/* NAVIGATION */}
      <button className="hero-nav prev" onClick={prevSlide}>
        &#10094;
      </button>

      <button className="hero-nav next" onClick={nextSlide}>
        &#10095;
      </button>

      {/* DOTS */}
      <div className="hero-dots">
        {posts.map((_, index) => (
          <button
            key={index}
            className={index === active ? "active" : ""}
            onClick={() => setActive(index)}
          ></button>
        ))}
      </div>
    </section>
  );
}