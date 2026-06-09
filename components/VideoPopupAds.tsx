"use client";

import { useState } from "react";

export default function VideoPopupAds() {
  const [open, setOpen] = useState(false);

  const videoUrl =
    "https://cms.komunikasi.uinsgd.ac.id/wp-content/uploads/2026/06/iklan_01.mp4";

  return (
    <>
      <div className="lg:col-span-1">
        <div className="bg-black rounded-xl overflow-hidden shadow-lg sticky top-4">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onClick={() => setOpen(true)}
            className="w-full aspect-[9/16] object-cover cursor-pointer"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-3 -right-3 z-10 w-10 h-10 rounded-full bg-red-600 text-white text-xl font-bold"
            >
              ✕
            </button>

            <video
              autoPlay
              controls
              playsInline
              className="w-full aspect-[9/16] rounded-xl"
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
          </div>
        </div>
      )}
    </>
  );
}