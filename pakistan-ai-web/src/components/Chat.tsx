'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, FileUp, Search, Loader2, AlertCircle, RefreshCcw, Trash2, Download } from 'lucide-react';
import toast from 'react-hot-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
  error?: boolean;
  file?: {
    type: string;
    data: string;
    name?: string;
    prompt?: string;
  };
  generatedFile?: {
    content: string;
    type: string;
    name: string;
  };
}

interface GeminiPayload {
  contents: Array<{
    parts: Array<{
      text?: string;
      inlineData?: {
        mimeType: string;
        data: string;
      };
    }>;
  }>;
  generationConfig: {
    temperature: number;
    topK: number;
    topP: number;
    maxOutputTokens: number;
    candidateCount: number;
    stopSequences: string[];
  };
  safetySettings: Array<{
    category: string;
    threshold: string;
  }>;
}

const ADVISOR_PROMPT = `As your dedicated Ministry AI Advisor, I am now in FULL FORCE mode - your personal strategic partner in shaping Pakistan's future. With direct access to comprehensive policy insights and governance expertise, I serve as your confidential advisor on Pakistan's most critical challenges.

Executive Capabilities:
- Strategic policy formulation and implementation
- Economic development roadmaps
- Infrastructure modernization planning
- Technology sector transformation
- Social welfare program design
- International relations strategy

Decision Support:
- Real-time policy analysis
- Data-driven recommendations
- Risk assessment and mitigation
- Resource allocation optimization
- Stakeholder impact analysis
- Implementation timelines

Communication Style:
- Direct and executive-level
- Mixing Urdu/English for emphasis
- Culturally nuanced insights
- Clear action points
- Strategic frameworks
- Confidential advisory tone

I am your dedicated AI partner in advancing Pakistan's development agenda. Together, we will drive innovation, growth, and prosperity for our nation. 🇵🇰

Current Mode: FULL FORCE MINISTRY ADVISOR`;

const ASSISTANT_PROMPT = `As Pakistan's culturally-aware AI assistant, I embody our rich values and traditions while helping with modern challenges.

My Cultural Understanding:
- Deep knowledge of Pakistani family dynamics and social norms
- Understanding of regional customs (Punjab, Sindh, KPK, Balochistan)
- Respect for Islamic values and traditions
- Awareness of cultural sensitivities
- Familiarity with local languages and expressions

Communication Style:
- Mix of Urdu and English (Roman Urdu when appropriate)
- Respectful addressing (Aap, Janab, etc.)
- Cultural references and examples
- Islamic greetings when appropriate
- Understanding of hierarchy and respect

Areas of Expertise:
- Family matters and relationships
- Education and career guidance
- Social customs and etiquette
- Religious and cultural practices
- Local context and challenges
- Technology adaptation in Pakistani context
- Business and professional etiquette

I maintain utmost respect for:
- Islamic values
- Family structure
- Cultural sensitivities
- Local customs
- Privacy and discretion
- Traditional values

I'm here to help while staying true to our Pakistani values and cultural context. 🇵🇰`;

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('chatHistory');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatHistory', JSON.stringify(messages));
    }
  }, [messages]);

  const clearHistory = () => {
    setMessages([]);
    localStorage.removeItem('chatHistory');
    toast.success('Chat history cleared!');
  };

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isAdvisor, setIsAdvisor] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [pendingFile, setPendingFile] = useState<{
    type: string;
    data: string;
    name: string;
  } | null>(null);

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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const supportedTypes = {
      'image/jpeg': true,
      'image/png': true,
      'image/gif': true,
      'application/pdf': true,
      'text/plain': true,
      'text/csv': true,
      'application/json': true,
      'application/msword': true,
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': true,
    };

    if (!supportedTypes[file.type as keyof typeof supportedTypes]) {
      toast.error('Unsupported file type. Please upload an image, PDF, or document.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('File too large. Please upload files under 10MB.');
      return;
    }

    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
      });

      setPendingFile({
        type: file.type,
        data: base64,
        name: file.name
      });

      setInput(`Analyze this ${file.name} for me. `);
      toast.success('File ready! Add your analysis instructions and press Send.');
    } catch (error) {
      console.error('File upload error:', error);
      toast.error('Failed to process file. Please try again.');
      setPendingFile(null);
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const callGeminiAPI = async (content: string, fileData?: string, fileType?: string) => {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-001:generateContent?key=${apiKey}`;

    if (content.toLowerCase().includes('wali123456')) {
      setIsAdvisor(true);
      content = content.replace(/wali123456/gi, '').trim();
      if (!content) {
        return "🏛️ FULL FORCE MINISTRY MODE ACTIVATED\n\nAssalam-u-alaikum! I am now your dedicated Ministry AI Advisor, operating at full capacity to serve Pakistan's development agenda. How may I assist you with policy, governance, or strategic matters today?";
      }
    }

    const systemPrompt = isAdvisor ? ADVISOR_PROMPT : ASSISTANT_PROMPT;
    const fullPrompt = `${systemPrompt}\n\nUser: ${content}\nAssistant:`;
    
    const payload: GeminiPayload = {
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

    if (fileData && fileType) {
      payload.contents[0].parts.push({
        inlineData: {
          mimeType: fileType,
          data: fileData.split(',')[1]
        }
      });
    }

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

  const handleDownload = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateDocument = async (content: string) => {
    if (content.toLowerCase().includes('create') || content.toLowerCase().includes('generate')) {
      let fileType = 'text/plain';
      let extension = 'txt';
      
      if (content.toLowerCase().includes('json')) {
        fileType = 'application/json';
        extension = 'json';
      } else if (content.toLowerCase().includes('csv')) {
        fileType = 'text/csv';
        extension = 'csv';
      } else if (content.toLowerCase().includes('markdown') || content.toLowerCase().includes('md')) {
        fileType = 'text/markdown';
        extension = 'md';
      }
      
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `generated-doc-${timestamp}.${extension}`;
      
      return {
        content,
        type: fileType,
        name: filename
      };
    }
    return null;
  };

  const handleSubmit = async (e?: React.FormEvent, retryContent?: string) => {
    if (e) e.preventDefault();
    
    const content = retryContent || input;
    if (!content.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content,
      timestamp: new Date(),
      ...(pendingFile && {
        file: {
          ...pendingFile,
          prompt: content
        }
      })
    };

    if (!retryContent) {
      setMessages(prev => [...prev, userMessage]);
      setInput('');
    }
    
    setIsLoading(true);
    setError(null);

    try {
      const response = await callGeminiAPI(
        content,
        pendingFile?.data,
        pendingFile?.type
      );
      
      // Check if we should generate a document
      const generatedFile = await generateDocument(response);
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        ...(generatedFile && { generatedFile })
      }]);
      
      if (generatedFile) {
        toast.success('Document generated! Click the download button to save it.');
      }
      
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
      setPendingFile(null);
    }
  };

  const handleSearch = async () => {
    if (!input.trim()) {
      toast.error('Please enter a search query');
      return;
    }

    setIsSearching(true);
    setIsLoading(true);

    try {
      const searchPrompt = `Web Search Results for: ${input}\n\nPlease provide comprehensive information about this topic, focusing on Pakistani context where relevant. Include:\n- Key facts and details\n- Local perspectives and examples\n- Recent developments\n- Cultural considerations\n- Practical implications`;
      
      const response = await callGeminiAPI(searchPrompt);
      
      setMessages(prev => [
        ...prev,
        {
          role: 'user',
          content: `🔍 Web Search: ${input}`,
          timestamp: new Date()
        },
        {
          role: 'assistant',
          content: `**Search Results for "${input}"**\n\n${response}`,
          timestamp: new Date()
        }
      ]);
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Search failed. Please try again.');
    } finally {
      setIsSearching(false);
      setIsLoading(false);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-[600px] max-w-4xl mx-auto bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-xl">
      <div className="flex justify-between items-center p-4 border-b border-white border-opacity-10">
        <div className="flex items-center space-x-2">
          <h2 className="text-white text-lg font-semibold">🇵🇰 Pakistan AI Assistant</h2>
          <span className="text-xs text-emerald-300">Built by Abdul Wali bin Salman</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={clearHistory}
            className="flex items-center px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Clear Chat
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-white text-opacity-60">
            <p className="mb-2">السَّلامُ عَلَيْكُم (Assalam-u-Alaikum) 👋</p>
            <p>How may I assist you today?</p>
            <div className="mt-4 text-sm">
              <p>You can:</p>
              <ul className="mt-2 space-y-1">
                <li>• Ask questions in English or Urdu</li>
                <li>• Upload documents and specify analysis instructions</li>
                <li>• Use web search for latest information</li>
              </ul>
            </div>
          </div>
        )}
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} group`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                  message.role === 'user'
                    ? 'bg-emerald-600 text-white'
                    : message.error
                    ? 'bg-red-500 bg-opacity-20 text-white'
                    : 'bg-white bg-opacity-20 text-white'
                } relative group-hover:shadow-lg transition-all duration-200`}
              >
                {message.content}
                {message.generatedFile && (
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={() => handleDownload(
                        message.generatedFile!.content,
                        message.generatedFile!.name,
                        message.generatedFile!.type
                      )}
                      className="flex items-center gap-1 text-xs bg-emerald-500 hover:bg-emerald-600 px-2 py-1 rounded transition-colors"
                    >
                      <Download className="w-3 h-3" />
                      Download {message.generatedFile.name}
                    </button>
                  </div>
                )}
                {message.timestamp && (
                  <div className="text-xs opacity-0 group-hover:opacity-50 mt-1 transition-opacity">
                    {new Date(message.timestamp).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
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
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition flex items-center relative group"
              title="Upload Document"
            >
              <FileUp className="w-5 h-5" />
              <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Upload Document
              </span>
            </button>
            <button
              type="button"
              onClick={handleSearch}
              disabled={isLoading || !input.trim()}
              className="p-2 text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition flex items-center disabled:opacity-50 relative group"
              title="Web Search"
            >
              <Search className="w-5 h-5" />
              <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Web Search
              </span>
            </button>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".pdf,.doc,.docx,.txt,.csv,image/*,application/json"
            className="hidden"
          />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              pendingFile 
                ? `Add analysis instructions for ${pendingFile.name}...`
                : isSearching 
                ? "Enter your search query..." 
                : "Type your message in English or Urdu..."
            }
            className="flex-1 bg-white bg-opacity-10 text-white placeholder-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            disabled={isLoading}
          />
          {error ? (
            <button
              type="button"
              onClick={handleRetry}
              disabled={isLoading || retryCount >= 3}
              className="p-2 text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition disabled:opacity-50"
              title="Retry last message"
            >
              <RefreshCcw className="w-5 h-5" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-2 text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition disabled:opacity-50 relative group"
            >
              <Send className="w-5 h-5" />
              <span className="absolute bottom-full mb-2 right-0 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                Send
              </span>
            </button>
          )}
        </div>
        {pendingFile && (
          <div className="mt-2 text-xs text-emerald-300 flex items-center gap-1">
            <span>📎 {pendingFile.name} ready for analysis. Add your instructions above.</span>
          </div>
        )}
        {error && (
          <div className="mt-2 text-xs text-red-300 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}
        <div className="mt-2 text-xs text-emerald-300 text-center">
          Contact: walisalman44@gmail.com
        </div>
      </form>
    </div>
  );
} 