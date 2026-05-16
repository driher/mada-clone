const Footer = () => {
  return (
    <footer className="mt-24 bg-gradient-to-b from-gray-900 to-black text-gray-300">
      <div className="max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <h2 className="text-white text-2xl font-bold mb-3 tracking-tight">
            Ilmu Komunikasi
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Program studi komunikasi modern, media digital, dan kehumasan profesional.
          </p>
          <div className="w-12 h-1 bg-green-500 mt-4 rounded" />
        </div>

        {/* NAVIGASI */}
        <div>
          <h3 className="text-white font-semibold mb-4">Navigasi</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/">Beranda</a></li>
            <li><a href="https://damba.uinsgd.ac.id/auth/login">PMB</a></li>
            <li><a href="/profil">Profil</a></li>
            <li><a href="/kontak">Kontak</a></li>
          </ul>
        </div>

        {/* KONTAK */}
        <div>
          <h3 className="text-white font-semibold mb-4">Kontak</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Email: ilkom@uinsgd.ac.id</li>
            <li>Telp: (022) 12345678</li>
            <li>Bandung, Jawa Barat</li>
          </ul>
        </div>

        {/* SOSIAL */}
        <div>
          <h3 className="text-white font-semibold mb-4">Terhubung</h3>

          <div className="flex gap-3">

            {/* INSTAGRAM */}
            <a
              href="https://www.instagram.com/ilkom_uinbandung"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:scale-110 transition"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5">
                <defs>
                  <linearGradient id="ig-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#feda75"/>
                    <stop offset="25%" stopColor="#fa7e1e"/>
                    <stop offset="50%" stopColor="#d62976"/>
                    <stop offset="75%" stopColor="#962fbf"/>
                    <stop offset="100%" stopColor="#4f5bd5"/>
                  </linearGradient>
                </defs>
                <path
                  fill="url(#ig-gradient)"
                  d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm4.25 5.5A4.25 4.25 0 1 0 16.25 12 4.25 4.25 0 0 0 12 7.5zm0 7A2.75 2.75 0 1 1 14.75 12 2.75 2.75 0 0 1 12 14.5zm4.5-7.88a1 1 0 1 1 1-1 1 1 0 0 1-1 1z"
                />
              </svg>
            </a>

            {/* YOUTUBE */}
            <a
              href="https://www.youtube.com/channel/UCZdcQSCXzAPAOsu7xEEB9FQ"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:scale-110 transition"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-red-500">
                <path d="M23.5 6.2a2.9 2.9 0 0 0-2-2C19.7 3.7 12 3.7 12 3.7s-7.7 0-9.5.5a2.9 2.9 0 0 0-2 2A30.4 30.4 0 0 0 0 12a30.4 30.4 0 0 0 .5 5.8 2.9 2.9 0 0 0 2 2c1.8.5 9.5.5 9.5.5s7.7 0 9.5-.5a2.9 2.9 0 0 0 2-2A30.4 30.4 0 0 0 24 12a30.4 30.4 0 0 0-.5-5.8zM9.8 15.5V8.5l6 3.5-6 3.5z"/>
              </svg>
            </a>

            {/* WHATSAPP */}
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:scale-110 transition"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-green-500">
                <path d="M20 3.9A11.8 11.8 0 0 0 12 .9 11.9 11.9 0 0 0 1.9 18.1L.9 23l5-1A11.9 11.9 0 0 0 12 23a11.8 11.8 0 0 0 8-19.1zM12 21a9.9 9.9 0 0 1-5-1.4l-.4-.2-3 .6.6-2.9-.2-.4A9.9 9.9 0 1 1 12 21zm5.3-7.4c-.3-.2-1.8-.9-2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8.3 8.3 0 0 1-2.4-1.5 9.2 9.2 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.7s.2-.4.3-.6.2-.3.3-.5 0-.4 0-.6-.7-1.7-1-2.3-.6-.5-.7-.5h-.6a1.2 1.2 0 0 0-.9.4 3.6 3.6 0 0 0-1.1 2.6 6.2 6.2 0 0 0 1.3 3.2 14.2 14.2 0 0 0 5.4 5 6.3 6.3 0 0 0 3 .9 3.8 3.8 0 0 0 2.5-.9 3.1 3.1 0 0 0 .9-2.2c0-.1 0-.3-.2-.4z"/>
              </svg>
            </a>

          </div>

          <p className="text-xs text-gray-500 mt-4">
            Ikuti kami untuk update terbaru
          </p>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="border-t border-gray-800 text-center text-sm text-gray-500 py-6">
        © {new Date().getFullYear()} Ilmu Komunikasi
      </div>
    </footer>
  );
};

export default Footer;