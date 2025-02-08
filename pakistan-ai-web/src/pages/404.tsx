export default function Custom404() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-800 to-green-900 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 text-white">404</h1>
        <p className="text-xl mb-8 text-white/90">Page not found</p>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a 
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-xl transition-all ring-1 ring-emerald-500/30"
        >
          Take Me Home
        </a>
      </div>
    </div>
  );
} 