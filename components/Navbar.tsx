"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // DROPDOWN MENU
  const menus = [
    {
      name: "Profil",
      items: [
        { label: "Sejarah Prodi", href: "/profil/sejarah" },
        { label: "Visi & Misi", href: "/profil/visi-misi" },
        { label: "Tujuan", href: "/profil/tujuan" },
        { label: "Akreditasi", href: "/profil/akreditasi" },
        { label: "Struktur Organisasi", href: "/profil/struktur" },
        { label: "Dosen & Tenaga Pengajar", href: "/profil/dosen" },
        { label: "Staff Administrasi", href: "/profil/staff" },
        { label: "Fasilitas", href: "/profil/fasilitas" },
      ],
    },
    {
      name: "Akademik",
      items: [
        { label: "Kurikulum", href: "/akademik/kurikulum" },
        { label: "Mata Kuliah", href: "/akademik/mata-kuliah" },
        { label: "Kalender Akademik", href: "/akademik/kalender" },
        { label: "Panduan Akademik", href: "/akademik/panduan" },
        { label: "Sistem Perkuliahan", href: "/akademik/sistem" },
        { label: "Konsentrasi Humas", href: "/akademik/humas" },
        { label: "Konsentrasi Jurnalistik", href: "/akademik/jurnalistik" },
      ],
    },
    {
      name: "Pengumuman",
      items: [
        { label: "Pengumuman Akademik", href: "/pengumuman/akademik" },
        { label: "Pengumuman Umum", href: "/pengumuman" },
        { label: "Beasiswa", href: "/pengumuman/beasiswa" },
        { label: "Lowongan / Magang", href: "/pengumuman/karir" },
      ],
    },
    {
      name: "Galeri",
      items: [
        { label: "Foto Kegiatan", href: "/galeri/foto" },
        { label: "Video Dokumentasi", href: "/galeri/video" },
        { label: "Media Coverage", href: "/galeri/media" },
      ],
    },
    {
      name: "Download",
      items: [
        { label: "Form Akademik", href: "/download/form" },
        { label: "Panduan Skripsi", href: "/download/skripsi" },
        { label: "Template Proposal", href: "/download/template" },
        { label: "Dokumen Penting", href: "/download/dokumen" },
      ],
    },
  ];

  // LINK LANGSUNG
  const directLinks = [
    { name: "Berita", href: "/berita" },
    { name: "Agenda", href: "/agenda" },
    { name: "Mahasiswa", href: "/mahasiswa" },
    { name: "Penelitian", href: "/penelitian" },
    { name: "Alumni", href: "/alumni/karir" },
  ];

  return (
    <div className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo1.png" alt="logo" width={180} height={60} />
        </Link>

        {/* HAMBURGER */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          ☰
        </button>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">

          {/* HOME */}
          <Link href="/" className="hover:text-orange-500">
            Home
          </Link>

          {/* PROFIL + AKADEMIK (URUT SETELAH HOME) */}
          {menus.slice(0, 2).map((menu) => (
            <div key={menu.name} className="relative group">
              <div className="cursor-pointer hover:text-orange-500 py-2">
                {menu.name}
              </div>

              <div className="
                absolute left-0 top-full w-64 bg-white shadow-xl rounded-xl border z-50
                invisible opacity-0 translate-y-3
                transition-all duration-300 ease-out
                group-hover:visible group-hover:opacity-100 group-hover:translate-y-0
              ">
                <div className="absolute -top-3 left-0 w-full h-3"></div>

                {menu.items.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block px-4 py-2 text-sm hover:bg-orange-50 hover:text-orange-600"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* LINK LANGSUNG */}
          {directLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="hover:text-orange-500"
            >
              {item.name}
            </Link>
          ))}

          {/* SISA DROPDOWN */}
          {menus.slice(2).map((menu) => (
            <div key={menu.name} className="relative group">
              <div className="cursor-pointer hover:text-orange-500 py-2">
                {menu.name}
              </div>

              <div className="
                absolute left-0 top-full w-64 bg-white shadow-xl rounded-xl border z-50
                invisible opacity-0 translate-y-3
                transition-all duration-300 ease-out
                group-hover:visible group-hover:opacity-100 group-hover:translate-y-0
              ">
                <div className="absolute -top-3 left-0 w-full h-3"></div>

                {menu.items.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block px-4 py-2 text-sm hover:bg-orange-50 hover:text-orange-600"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t px-4 pb-4">

          <Link
            href="/"
            className="block py-2 font-medium border-b"
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>

          {/* MOBILE PROFIL + AKADEMIK */}
          {menus.slice(0, 2).map((menu) => (
            <div key={menu.name} className="border-b py-2">
              <p className="font-medium">{menu.name}</p>
              <div className="pl-3 mt-1">
                {menu.items.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block py-1 text-sm text-gray-600 hover:text-orange-500"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* MOBILE DIRECT LINKS */}
          {directLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block py-2 font-medium border-b"
              onClick={() => setMobileOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          {/* MOBILE DROPDOWN LAINNYA */}
          {menus.slice(2).map((menu) => (
            <div key={menu.name} className="border-b py-2">
              <p className="font-medium">{menu.name}</p>
              <div className="pl-3 mt-1">
                {menu.items.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block py-1 text-sm text-gray-600 hover:text-orange-500"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}