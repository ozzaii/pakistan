'use client';

import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Chat from '@/components/Chat';

export default function Home() {
  return (
    <main className="h-[100dvh] supports-[height:100svh]:h-[100svh] supports-[height:100dvh]:h-[100dvh] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-800 via-emerald-900 to-gray-900 relative overflow-hidden selection:bg-emerald-500/30 flex flex-col">
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

      {/* Chat Interface - Premium container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 w-full min-h-0 pt-safe px-0 pb-safe"
      >
        <div className="h-full">
          <Chat />
        </div>
      </motion.div>
    </main>
  );
} 