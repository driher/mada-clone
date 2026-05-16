  <span className="text-sm font-medium text-gray-600 mr-2">
              Bagikan:
            </span>

            {/* WHATSAPP */}
            <a
              href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
              target="_blank"
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition"
            >
              <svg width="18" height="18" viewBox="0 0 32 32" fill="currentColor">
                <path d="M19.11 17.53c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.12-.41-2.13-1.3-.79-.7-1.32-1.56-1.48-1.83-.16-.27-.02-.42.12-.56.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27s.98 2.63 1.12 2.81c.14.18 1.94 2.96 4.7 4.15.66.28 1.18.45 1.58.58.66.21 1.26.18 1.73.11.53-.08 1.6-.65 1.83-1.28.23-.63.23-1.18.16-1.28-.07-.1-.25-.16-.52-.3z"/>
                <path d="M16 3C8.82 3 3 8.82 3 16c0 2.3.6 4.54 1.75 6.5L3 29l6.7-1.7C11.58 28.4 13.76 29 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3zm0 24c-2.02 0-3.98-.54-5.68-1.56l-.41-.25-3.98 1.01 1.06-3.87-.27-.4A10.9 10.9 0 0 1 5 16C5 9.93 9.93 5 16 5s11 4.93 11 11-4.93 11-11 11z"/>
              </svg>
              WhatsApp
            </a>

            {/* FACEBOOK */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
              target="_blank"
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12"/>
              </svg>
              Facebook
            </a>

            {/* TELEGRAM */}
            <a
              href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`}
              target="_blank"
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-sky-500 text-white hover:bg-sky-600 transition"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.04 15.54 8.9 19.1c.41 0 .59-.18.81-.4l1.95-1.87 4.04 2.96c.74.41 1.27.2 1.46-.68l2.66-12.48c.27-1.22-.44-1.7-1.2-1.42L3.6 9.24c-1.2.47-1.18 1.14-.2 1.44l4.86 1.52L19.5 6.3c.55-.35 1.05-.16.64.21"/>
              </svg>
              Telegram
            </a>

            {/* THREADS */}
            <a
              href={`https://www.threads.net/intent/post?text=${encodedTitle}%20${encodedUrl}`}
              target="_blank"
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.5 8.5c-.9-2.2-2.7-3.5-5.1-3.5-3.8 0-6.4 3-6.4 7s2.6 7 6.4 7c3.5 0 5.9-2.3 6.3-5.8h-2.2c-.3 2.3-1.8 3.8-4.1 3.8-2.7 0-4.4-2.1-4.4-5s1.7-5 4.4-5c1.7 0 3 .8 3.7 2.3h2.4z"/>
              </svg>
              Threads
            </a>
