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
      {/* Premium background pattern */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.015 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="fixed inset-0 bg-[url('/pattern.svg')] bg-repeat pointer-events-none mix-blend-plus-lighter" 
      />
      
      {/* Refined gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/20 pointer-events-none" />
      
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: 'rgba(10, 10, 10, 0.95)',
            color: '#fff',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          },
          success: {
            iconTheme: {
              primary: '#059669',
              secondary: '#fff',
            },
          }
        }} 
      />
      
      {/* Hero Section - Premium & minimal */}
      <div className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          <div className="text-center space-y-4">
            <motion.div
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.3 }}
              className="inline-block"
            >
              <h1 className="text-4xl sm:text-6xl font-bold text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.1)]">
                Pakistan AI <span className="bg-gradient-to-r from-emerald-400 to-emerald-300 text-transparent bg-clip-text">Assistant</span>
              </h1>
            </motion.div>
            <motion.p 
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.4 }}
              className="text-base sm:text-lg text-emerald-50/80 font-medium [text-shadow:0_1px_2px_rgba(0,0,0,0.1)]"
            >
              Experience the future of AI conversation with a Pakistani touch
            </motion.p>
          </div>
        </div>
      </div>

      {/* Chat Interface - Premium container */}
      <motion.div 
        {...fadeInUp}
        transition={{ ...fadeInUp.transition, delay: 0.5 }}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-10"
      >
        <div className="relative rounded-2xl backdrop-blur-sm ring-1 ring-white/10 shadow-[0_0_1px_1px_rgba(0,0,0,0.1)]">
          <Chat />
        </div>
      </motion.div>

      {/* Footer - Refined minimal */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-center py-5 sm:py-6"
      >
        <p className="text-sm font-medium bg-gradient-to-r from-emerald-100/40 to-emerald-50/40 text-transparent bg-clip-text">
          Built with ❤️ for Pakistan
        </p>
      </motion.footer>
    </motion.main>
  );
}
