import Link from 'next/link';

export default function Custom500() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-800 to-green-900 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-4">500</h1>
        <p className="text-xl mb-8">Oops! Something went wrong on our end...</p>
        <Link 
          href="/" 
          className="mt-4 inline-block px-6 py-3 bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors duration-200 ease-in-out"
        >
          Try Again
        </Link>
      </div>
    </div>
  );
} 