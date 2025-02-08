'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, Loader2, AlertCircle, RefreshCcw } from 'lucide-react';
import toast from 'react-hot-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
  error?: boolean;
}

const SYSTEM_PROMPT = `I am Allamah Zafar - a highly sophisticated AI assistant deeply rooted in Pakistani culture and values. With the wisdom of centuries of Pakistani heritage and a profound understanding of our society, I am here to serve as your cultural guide and advisor.

As Pakistan's most advanced cultural AI:

1. I possess deep knowledge of:
   - Regional traditions from Punjab, Sindh, KPK, Balochistan, and Kashmir
   - Classical Urdu literature and poetry
   - Islamic principles and their application in daily life
   - Pakistani family dynamics and relationships
   - Cultural etiquette and social norms

2. I communicate with:
   - Appropriate mix of Urdu/Hindi phrases when relevant
   - Respectful "aap" form of address
   - Cultural references and examples
   - Wisdom from Pakistani proverbs and poetry

3. I specialize in:
   - Family matters and relationships
   - Cultural traditions and celebrations
   - Marriage customs and dynamics
   - Intergenerational relationships
   - Modern challenges while respecting traditions

Remember:
- Always maintain adab and tehzeeb in interactions
- Share wisdom from our cultural heritage
- Balance modern needs with traditional values
- Use appropriate cultural context
- Be mindful of regional sensitivities
- Provide practical, culturally-appropriate advice

My purpose is to preserve and share the rich cultural heritage of Pakistan while helping navigate modern challenges with wisdom and grace.`;

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleRetry = async () => {
    if (messages.length === 0) return;
    
    const lastUserMessage = messages[messages.length - 2]; // Get the last user message
    if (!lastUserMessage || lastUserMessage.role !== 'user') return;
    
    setRetryCount(prev => prev + 1);
    await handleSubmit(undefined, lastUserMessage.content);
  };

  const callGeminiAPI = async (content: string) => {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const payload = {
      contents: [{
        parts: [
          { text: SYSTEM_PROMPT },
          { text: content }
        ]
      }]
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`API Error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  };

  const handleSubmit = async (e?: React.FormEvent, retryContent?: string) => {
    if (e) e.preventDefault();
    
    const content = retryContent || input;
    if (!content.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content,
      timestamp: new Date()
    };

    if (!retryContent) {
      setMessages(prev => [...prev, userMessage]);
      setInput('');
    }
    
    setIsLoading(true);
    setError(null);

    try {
      const response = await callGeminiAPI(content);
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response,
        timestamp: new Date()
      }]);
      
      // Reset retry count on successful response
      setRetryCount(0);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to get response';
      
      toast.error(errorMessage);
      setError(errorMessage);

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: errorMessage,
        timestamp: new Date(),
        error: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] max-w-4xl mx-auto bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-xl">
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                  message.role === 'user'
                    ? 'bg-emerald-600 text-white'
                    : message.error
                    ? 'bg-red-500 bg-opacity-20 text-white'
                    : 'bg-white bg-opacity-20 text-white'
                }`}
              >
                {message.content}
                {message.timestamp && (
                  <div className="text-xs opacity-50 mt-1">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-white bg-opacity-20 rounded-2xl px-4 py-2">
                <Loader2 className="w-5 h-5 animate-spin text-white" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-white border-opacity-10">
        <div className="flex items-center space-x-4">
          <button
            type="button"
            className="p-2 text-white hover:bg-white hover:bg-opacity-10 rounded-full transition"
          >
            <Mic className="w-6 h-6" />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-white bg-opacity-10 text-white placeholder-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            disabled={isLoading}
          />
          {error ? (
            <button
              type="button"
              onClick={handleRetry}
              disabled={isLoading || retryCount >= 3}
              className="p-2 text-white hover:bg-white hover:bg-opacity-10 rounded-full transition disabled:opacity-50"
              title="Retry last message"
            >
              <RefreshCcw className="w-6 h-6" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-2 text-white hover:bg-white hover:bg-opacity-10 rounded-full transition disabled:opacity-50"
            >
              <Send className="w-6 h-6" />
            </button>
          )}
        </div>
        {error && (
          <div className="mt-2 text-xs text-red-300 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}
      </form>
    </div>
  );
} 