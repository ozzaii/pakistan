import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-800 to-green-900 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl">Page not found</p>
        <Link 
          href="/" 
          className="mt-4 inline-block px-6 py-2 bg-emerald-600 rounded-lg hover:bg-emerald-700 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
} 