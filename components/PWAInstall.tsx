"use client";

import { useEffect, useState } from "react";

export default function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone;

    if (isStandalone) return;

    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShow(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    const choice = await deferredPrompt.userChoice;

    if (choice.outcome === "accepted") {
      setShow(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md bg-white shadow-2xl rounded-2xl p-5 border border-pink-200">

      <h3 className="text-lg font-bold text-gray-900 mb-2">
        Install Aplikasi Ilkom UIN SGD
      </h3>

      <p className="text-sm text-gray-600 mb-4">
        Install aplikasi agar akses lebih cepat tanpa address bar dan dapat dibuka seperti aplikasi mobile.
      </p>

      <div className="flex gap-3">
        <button
          onClick={installApp}
          className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-xl text-sm font-semibold"
        >
          Install
        </button>

        <button
          onClick={() => setShow(false)}
          className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl text-sm"
        >
          Nanti
        </button>
      </div>
    </div>
  );
}