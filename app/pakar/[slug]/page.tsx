import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getPakar(slug: string) {
  try {
    const res = await fetch(
      `https://cms.komunikasi.uinsgd.ac.id/wp-json/wp/v2/pakar?slug=${slug}&_embed`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return null;
    }

    const data = await res.json();

    return data?.[0] || null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function DetailPakar({
  params,
}: PageProps) {
  const { slug } = await params;

  const data = await getPakar(slug);

  if (!data) {
    notFound();
  }

  const custom = data?.custom_fields || {};

  const nama =
    data?.title?.rendered ||
    "Tanpa Nama";

  const wpFeatured =
    data?._embedded?.["wp:featuredmedia"]?.[0]
      ?.source_url || null;

  const avatar =
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      nama
    )}&background=15803d&color=ffffff&size=400`;

  const foto =
    wpFeatured ||
    avatar;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4">

        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">

          {/* HERO */}
          <div className="h-64 bg-gradient-to-r from-green-900 via-green-700 to-emerald-500 relative">
            <div className="absolute inset-0 bg-black/10" />
          </div>

          {/* CONTENT */}
          <div className="px-8 pb-10 relative">

            {/* FOTO */}
            <div className="absolute -top-24 center-8">
              <img
                src={foto}
                alt={nama}
                className="w-44 h-44 rounded-full border-[8px] border-white object-cover shadow-2xl bg-white"
              />
            </div>

            <div className="pt-28">

              {/* BADGE */}
              <span className="inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                Pakar Ilmu Komunikasi UIN Sunan Gunung Djati Bandung
              </span>

              {/* NAMA */}
              <h1
                className="text-4xl font-bold text-gray-900 mt-5"
                dangerouslySetInnerHTML={{
                  __html: nama,
                }}
              />

              {/* BIDANG */}
              <p className="text-xl text-green-700 mt-3 font-medium">
                {custom?.["bidang_keahlian"] ||
                  "Bidang belum tersedia"}
              </p>

              {/* GRID */}
              <div className="grid lg:grid-cols-3 gap-8 mt-10">

                {/* LEFT */}
                <div className="lg:col-span-2 space-y-6">

                  {/* REKAM JEJAK */}
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <h2 className="text-2xl font-bold mb-4">
                      Rekam Jejak Akademik & Profesional
                    </h2>

                    <p className="text-gray-600 leading-8 whitespace-pre-line">
                      {
                        custom?.[
                          "rekam_jejak_akademik_&_profesional"
                        ] ||
                        "Data belum tersedia."
                      }
                    </p>
                  </div>

                  {/* KEBUTUHAN MEDIA */}
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <h2 className="text-2xl font-bold mb-4">
                      Kebutuhan Media & Publik
                    </h2>

                    <p className="text-gray-600 leading-8 whitespace-pre-line">
                      {custom?.kebutuhan_media_dan_publik ||
                        "Data belum tersedia."}
                    </p>
                  </div>

                  {/* DESKRIPSI */}
                  {data?.content?.rendered && (
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                      <h2 className="text-2xl font-bold mb-4">
                        Profil
                      </h2>

                      <div
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{
                          __html:
                            data.content.rendered,
                        }}
                      />
                    </div>
                  )}

                </div>

                {/* RIGHT */}
                <div>

                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 sticky top-5">

                    <h2 className="text-2xl font-bold mb-5">
                      Kontak & Informasi
                    </h2>

                    <div className="space-y-5">

                      {/* NIP */}
                      <div>
                        <div className="text-gray-400 text-sm mb-1">
                          NIP
                        </div>

                        <div className="font-medium text-gray-800">
                          {custom?.nip || "-"}
                        </div>
                      </div>

                      {/* EMAIL */}
                      <div>
                        <div className="text-gray-400 text-sm mb-1">
                          Email
                        </div>

                        <div className="font-medium text-gray-800 break-all">
                          {custom?.email ? (
                            <a
                              href={`mailto:${custom.email}`}
                              className="text-blue-600 hover:underline"
                            >
                              {custom.email}
                            </a>
                          ) : (
                            "-"
                          )}
                        </div>
                      </div>

                      {/* TWITTER */}
                      <div>
                        <div className="text-gray-400 text-sm mb-1">
                          Twitter / X
                        </div>

                        <div className="font-medium">
                          {custom?.twitter ? (
                            <a
                              href={`https://x.com/${custom.twitter}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              @{custom.twitter}
                            </a>
                          ) : (
                            "-"
                          )}
                        </div>
                      </div>

                      {/* INSTAGRAM */}
                      <div>
                        <div className="text-gray-400 text-sm mb-1">
                          Instagram
                        </div>

                        <div className="font-medium">
                          {custom?.instagram ? (
                            <a
                              href={`https://instagram.com/${custom.instagram}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-pink-600 hover:underline"
                            >
                              @{custom.instagram}
                            </a>
                          ) : (
                            "-"
                          )}
                        </div>
                      </div>

                      {/* LINKEDIN */}
                      <div>
                        <div className="text-gray-400 text-sm mb-1">
                          LinkedIn
                        </div>

                        <div className="font-medium">
                          {custom?.linkedin ? (
                            <a
                              href={
                                custom.linkedin.startsWith(
                                  "http"
                                )
                                  ? custom.linkedin
                                  : `https://linkedin.com/in/${custom.linkedin}`
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-700 hover:underline"
                            >
                              Profil LinkedIn
                            </a>
                          ) : (
                            "-"
                          )}
                        </div>
                      </div>

                      {/* ID */}
                      <div>
                        <div className="text-gray-400 text-sm mb-1">
                          ID Pakar
                        </div>

                        <div className="font-medium text-gray-800">
                          #{data?.id}
                        </div>
                      </div>

                      {/* SLUG */}
                      <div>
                        <div className="text-gray-400 text-sm mb-1">
                          Slug
                        </div>

                        <div className="font-medium text-gray-800 break-all">
                          {data?.slug}
                        </div>
                      </div>

                      {/* STATUS */}
                      <div>
                        <div className="text-gray-400 text-sm mb-1">
                          Status
                        </div>

                        <div className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                          Aktif
                        </div>
                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}