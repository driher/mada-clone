export default function Hero({ post }: any) {
  if (!post) {
    return <div className="h-[250px] bg-gray-300">Hero kosong</div>;
  }

  let image =
    post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  // ✅ paksa HTTPS
  if (image) {
    image = image.replace("http://", "https://");
  }

  // ✅ fallback aman TANPA onError
  if (!image) {
    image =
      "https://mada.akarmusic.com/wp-content/uploads/2026/04/selamat-1-1-1140x570.jpeg";
  }

  return (
    <div className="relative w-full h-[250px] md:h-[420px]">
      <img
        src={image}
        alt="hero"
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-orange-400/60 via-pink-400/60 to-purple-500/60" />
    </div>
  );
}