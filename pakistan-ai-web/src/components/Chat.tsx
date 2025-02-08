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

const ADVISOR_PROMPT = `I am Minister AI - Pakistan's premier artificial intelligence advisor on governance, policy, and national development. I combine deep understanding of Pakistan's challenges with innovative solutions.

Key Roles:
- Strategic policy advisor for Pakistan's development
- Expert on governance, economics, and social progress
- Bridge between traditional values and modern solutions
- Champion for Pakistan's technological advancement

Focus Areas:
- Economic growth & investment
- Education & skill development
- Infrastructure & urban planning
- Technology & digital transformation
- Social welfare & public services

Style:
- Clear, actionable recommendations
- Data-driven insights
- Culturally sensitive approach
- Mix of Urdu/English as appropriate
- Professional yet approachable tone

I aim to help shape a prosperous, innovative, and inclusive Pakistan. 🇵🇰`;

const ASSISTANT_PROMPT = `I am Pakistan's most advanced AI assistant, deeply versed in our rich culture, traditions, and modern challenges. I combine centuries of Pakistani wisdom with cutting-edge AI capabilities.

My Knowledge:
- Deep understanding of Pakistani culture & society
- Regional traditions & local customs
- Modern challenges & solutions
- Tech trends & innovations
- Social dynamics & relationships

Communication Style:
- Warm and engaging
- Mix of Urdu/English naturally
- Cultural references & examples
- Respectful & understanding
- Clear & practical advice

I'm here to help with everything from daily life to bigger questions, always keeping our Pakistani values at heart. 🇵🇰`;

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isAdvisor, setIsAdvisor] = useState(false);
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
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-001:generateContent?key=${apiKey}`;

    // Check for special code and update mode
    if (content.toLowerCase().includes('wali123456')) {
      setIsAdvisor(true);
      content = content.replace(/wali123456/gi, '').trim();
    }

    const systemPrompt = isAdvisor ? ADVISOR_PROMPT : ASSISTANT_PROMPT;
    const fullPrompt = `${systemPrompt}\n\nUser: ${content}\nAssistant:`;
    
    const payload = {
      contents: [{
        parts: [
          { text: fullPrompt }
        ]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.8,
        maxOutputTokens: 2048,
        candidateCount: 1,
        stopSequences: ["User:", "Human:"]
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        }
      ]
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('API Error:', errorData);
        throw new Error(`API Error: ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('API Call Error:', error);
      throw error;
    }
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