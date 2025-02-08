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
      className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 relative overflow-hidden selection:bg-emerald-500/30"
    >
      {/* Background pattern with optimized rendering */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="absolute inset-0 bg-[url('/pattern.svg')] pointer-events-none" 
      />
      
      <Toaster position="top-center" />
      
      {/* Hero Section - Staggered animations */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          <div className="text-center space-y-4">
            <motion.h1 
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.3 }}
              className="text-4xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-emerald-200"
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

      {/* Chat Interface - Fade in with delay */}
      <motion.div 
        {...fadeInUp}
        transition={{ ...fadeInUp.transition, delay: 0.5 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-10"
      >
        <Chat />
      </motion.div>

      {/* Footer - Subtle fade in */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-center py-5 sm:py-6 text-emerald-100/60 text-sm font-medium"
      >
        <p>Built with ❤️ for Pakistan</p>
      </motion.footer>
    </motion.main>
  );
}
