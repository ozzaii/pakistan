'use client';

import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Chat from '@/components/Chat';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-800 to-green-900">
      <Toaster position="top-center" />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
              Pakistan AI <span className="text-emerald-400">Assistant</span>
            </h1>
            <p className="text-xl text-emerald-100 mb-8">
              Experience the future of AI conversation with a Pakistani touch
            </p>
          </motion.div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Chat />
      </div>

      {/* Footer */}
      <footer className="text-center py-8 text-emerald-100 text-sm">
        <p>Built with ❤️ for Pakistan</p>
      </footer>
    </main>
  );
} 