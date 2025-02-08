'use client';

import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Chat from '@/components/Chat';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 relative overflow-hidden selection:bg-emerald-500/30">
      {/* Background pattern with optimized rendering */}
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-[0.03] pointer-events-none" />
      
      <Toaster position="top-center" />
      
      {/* Hero Section - Optimized animations */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-emerald-200 mb-3 sm:mb-5">
              Pakistan AI <span className="text-emerald-400">Assistant</span>
            </h1>
            <p className="text-base sm:text-lg text-emerald-50/90 mb-6 sm:mb-8 font-medium">
              Experience the future of AI conversation with a Pakistani touch
            </p>
          </motion.div>
        </div>
      </div>

      {/* Chat Interface - Optimized container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-10">
        <Chat />
      </div>

      {/* Footer - Refined styling */}
      <footer className="text-center py-5 sm:py-6 text-emerald-100/60 text-sm font-medium">
        <p>Built with ❤️ for Pakistan</p>
      </footer>
    </main>
  );
}
