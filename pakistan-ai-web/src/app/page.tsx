'use client';

import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Chat from '@/components/Chat';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-[100dvh] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-800 via-emerald-900 to-gray-900 relative overflow-hidden selection:bg-emerald-500/30"
    >
      {/* Optimized background pattern */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.02 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="fixed inset-0 bg-[url('/pattern.svg')] bg-repeat pointer-events-none mix-blend-soft-light" 
      />
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/10 pointer-events-none" />
      
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            backdropFilter: 'blur(8px)',
          },
        }} 
      />
      
      {/* Hero Section - Clean & minimal */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          <div className="text-center space-y-4">
            <motion.h1 
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.3 }}
              className="text-4xl sm:text-6xl font-bold text-white"
            >
              Pakistan AI <span className="text-emerald-400">Assistant</span>
            </motion.h1>
            <motion.p 
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.4 }}
              className="text-base sm:text-lg text-emerald-50/90 font-medium"
            >
              Experience the future of AI conversation with a Pakistani touch
            </motion.p>
          </div>
        </div>
      </div>

      {/* Chat Interface - Clean container */}
      <motion.div 
        {...fadeInUp}
        transition={{ ...fadeInUp.transition, delay: 0.5 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-10"
      >
        <Chat />
      </motion.div>

      {/* Footer - Minimal */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-center py-5 sm:py-6 text-emerald-50/50 text-sm font-medium"
      >
        <p>Built with ❤️ for Pakistan</p>
      </motion.footer>
    </motion.main>
  );
}
