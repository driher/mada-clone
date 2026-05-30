"use client";

import { useEffect, useMemo, useState } from "react";
import PakarCard from "../../components/PakarCard";
import SearchBox from "../../components/SearchBox";
import SidebarFilter from "../../components/SidebarFilter";

export default function PakarPage() {
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ======================
  // FETCH DATA
  // ======================
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          "https://cms.komunikasi.uinsgd.ac.id/wp-json/wp/v2/pakar?_embed&per_page=100",
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error(`HTTP Error ${res.status}`);
        }

        const json = await res.json();

        if (!Array.isArray(json)) {
          throw new Error("Format API tidak valid");
        }

        setData(json);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Gagal mengambil data");
        setData([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // ======================
  // FILTER
  // ======================
  const filtered = useMemo(() => {
    return data
      .filter((item) => {
        const nama =
          item?.title?.rendered?.toLowerCase() || "";

        const bidang =
          item?.custom_fields?.bidang?.toLowerCase() || "";

        const keyword = search.toLowerCase();

        return (
          nama.includes(keyword) ||
          bidang.includes(keyword)
        );
      })
      .sort((a, b) =>
        (a?.title?.rendered || "").localeCompare(
          b?.title?.rendered || ""
        )
      );
  }, [data, search]);

  // ======================
  // TOTAL BIDANG
  // ======================
  const totalBidang = useMemo(() => {
    const bidangSet = new Set<string>();

    data.forEach((item) => {
      const bidang = item?.custom_fields?.bidang;

      if (bidang && bidang.trim()) {
        bidangSet.add(bidang.trim());
      }
    });

    return bidangSet.size;
  }, [data]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">

      {/* HERO */}
      <section className="bg-gradient-to-r from-[#081A3A] via-[#102B63] to-[#F97316] pt-40 pb-16">
        <div className="max-w-7xl mx-auto px-4">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* LEFT */}
            <div>

              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                Direktori Pakar
                <br />
                Ilmu Komunikasi
              </h1>

              <p className="text-white/80 mt-5 text-lg max-w-2xl">
                Temukan akademisi, peneliti, praktisi,
                dan narasumber terbaik Program Studi
                Ilmu Komunikasi UIN Sunan Gunung Djati
                Bandung.
              </p>

              <div className="mt-8">
                <SearchBox
                  value={search}
                  onChange={setSearch}
                />
              </div>

            </div>

            {/* RIGHT */}
            <div className="grid grid-cols-2 gap-5">

              <div className="bg-white rounded-3xl p-6 shadow-xl">
                <div className="text-5xl font-bold text-green-700">
                  {data.length}
                </div>

                <div className="text-gray-500 mt-2">
                  Total Pakar
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-xl">
                <div className="text-5xl font-bold text-green-700">
                  {totalBidang}
                </div>

                <div className="text-gray-500 mt-2">
                  Bidang Keahlian
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-4 py-10">

        <div className="grid lg:grid-cols-12 gap-8">

          {/* SIDEBAR */}
          <div className="lg:col-span-3">
            <SidebarFilter />
          </div>

          {/* CONTENT */}
          <div className="lg:col-span-9">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-2">

              <h2 className="text-3xl font-bold text-gray-900">
                Daftar Pakar
              </h2>

              <div className="text-gray-500">
                {filtered.length} pakar ditemukan
              </div>

            </div>

            {/* ERROR */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 rounded-2xl p-5 mb-6">
                Gagal memuat data: {error}
              </div>
            )}

            {/* LOADING */}
            {loading && (
              <div className="bg-white rounded-2xl border p-10 text-center text-gray-500">
                Memuat data pakar...
              </div>
            )}

            {/* EMPTY */}
            {!loading &&
              !error &&
              filtered.length === 0 && (
                <div className="bg-white rounded-3xl border p-10 text-center">
                  <h3 className="text-2xl font-bold text-gray-700">
                    Data Tidak Ditemukan
                  </h3>

                  <p className="text-gray-500 mt-3">
                    Tidak ada pakar yang sesuai
                    dengan kata kunci pencarian.
                  </p>
                </div>
              )}

            {/* GRID */}
            {!loading && (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((item) => (
                  <PakarCard
                    key={item.id}
                    item={item}
                  />
                ))}
              </div>
            )}

          </div>

        </div>

      </section>

    </main>
  );
}