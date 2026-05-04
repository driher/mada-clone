import Link from "next/link";

export default function PopularLinks() {
  const links = [
    { label: "Pendaftaran PMB", url: "https://pmb.uinsgd.ac.id/tarif-ukt/" },
    { label: "Pusat Karir", url: "https://cdc.uinsgd.ac.id/" },
    { label: "Kanal Video", url: "https://damba.uinsgd.ac.id/" },
    { label: "Biaya UKT", url: "https://pmb.uinsgd.ac.id/tarif-ukt/" },
    { label: "Informasi Publik", url: "https://ppid.uinsgd.ac.id/" },
    { label: "JDIH", url: "https://jdih.uinsgd.ac.id/" },
  ];

  return (
    <div className="bg-gradient-to-r from-orange-300 via-pink-300 to-pink-200 rounded-br-[60px] rounded-bl-[20px] py-6 px-6 text-white">
      
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center gap-4">

        {/* TITLE */}
        <div className="text-2xl font-bold whitespace-nowrap">
          Popular links:
        </div>

        {/* LINKS */}
        <div className="flex gap-4 overflow-x-auto scrollbar-hide w-full">

          {links.map((item, i) => (
            <Link
              key={i}
              href={item.url}
              target="_blank"
              className="flex-shrink-0 border border-white/40 px-5 py-3 rounded-md text-sm font-semibold hover:bg-white hover:text-blue-600 transition"
            >
              {item.label}
            </Link>
          ))}

        </div>

      </div>
    </div>
  );
}