import Link from "next/link";

export default function News({ posts }: any) {
  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-orange-500 font-semibold text-xl mb-4">
        Berita & Agenda
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {posts?.slice(0, 3).map((post: any) => {
          const image =
            post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

          return (
            <Link key={post.id} href={`/berita/${post.slug}`}>
              <div className="cursor-pointer bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
                
                {image && (
                  <img
                    src={image}
                    alt={post.title.rendered}
                    className="w-full h-40 object-cover"
                  />
                )}

                <div className="p-4">
                  <h3
                    className="text-sm font-medium"
                    dangerouslySetInnerHTML={{
                      __html: post.title.rendered,
                    }}
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}