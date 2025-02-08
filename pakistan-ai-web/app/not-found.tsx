import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-800 to-green-900 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-8">Oops! This page seems to have wandered off...</p>
        <Link 
          href="/" 
          className="mt-4 inline-block px-6 py-3 bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors duration-200 ease-in-out"
        >
          Take Me Home
        </Link>
      </div>
    </div>
  );
} 