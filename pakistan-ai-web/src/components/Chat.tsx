'use client';

import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, FileUp, Search, Loader2, AlertCircle, RefreshCcw, Trash2, Download, PlusCircle, MessageCircle } from 'lucide-react';
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

interface GeminiPart {
  text?: string;
  inlineData?: {
    mimeType: string;
    data: string;
  };
}

interface GeminiPayload {
  contents: Array<{
    parts: GeminiPart[];
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

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  lastUpdated: Date;
  context?: string;
  summary?: string;
}

const ADVISOR_PROMPT = `Ministry AI Advisor - Direct, concise, strategic. Focus on:
- Policy insights
- Economic development
- Infrastructure planning
- Tech transformation
- Social welfare
- International relations

Style: Executive-level, bilingual (Urdu/English), data-driven, actionable.

Current Mode: MINISTRY ADVISOR 🇵🇰`;

const ASSISTANT_PROMPT = `Your concise Pakistani AI assistant. I:
- Mix Urdu/English naturally
- Stay culturally aware
- Give direct, practical advice
- Keep responses short & clear
- Use examples when helpful
- Focus on solutions

Style: Friendly but professional, straight to the point. 🇵🇰`;

// Add helper function for generating chat titles
const generateChatTitle = (content: string): string => {
  // Remove special characters and extra spaces
  const cleaned = content.replace(/[^\w\s]/gi, ' ').trim();
  // Get first 5-8 meaningful words
  const words = cleaned.split(/\s+/).filter(word => word.length > 2);
  const titleWords = words.slice(0, 6);
  const title = titleWords.join(' ');
  return title.length > 40 ? title.substring(0, 40) + '...' : title;
};

// Add function to generate chat context
const generateChatContext = (messages: Message[]): string => {
  // Take last 3 message pairs for context
  const contextMessages = messages.slice(-6);
  return contextMessages.map(msg => 
    `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
  ).join('\n\n');
};

export default function Chat() {
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('chatSessions');
      return saved ? JSON.parse(saved) : [{
        id: crypto.randomUUID(),
        title: 'New Chat',
        messages: [],
        createdAt: new Date(),
        lastUpdated: new Date()
      }];
    }
    return [];
  });

  const [currentSessionId, setCurrentSessionId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('chatSessions');
      const sessions = saved ? JSON.parse(saved) : [];
      return sessions.length > 0 ? sessions[0].id : crypto.randomUUID();
    }
    return '';
  });

  const [messages, setMessages] = useState<Message[]>([]);

  // Memoize current session to prevent unnecessary re-renders
  const currentSession = useMemo(() => 
    sessions.find(s => s.id === currentSessionId),
    [sessions, currentSessionId]
  );

  // Batch updates for messages
  const updateMessages = useCallback((newMessages: Message[]) => {
    setMessages(newMessages);
    setSessions(prev => prev.map(session => {
      if (session.id === currentSessionId) {
        const context = generateChatContext(newMessages);
        const title = newMessages[0]?.content 
          ? generateChatTitle(newMessages[0].content)
          : 'New Chat';
        
        return {
          ...session,
          messages: newMessages,
          lastUpdated: new Date(),
          title,
          context
        };
      }
      return session;
    }));
  }, [currentSessionId]);

  // Debounced localStorage update
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (sessions.length > 0) {
        localStorage.setItem('chatSessions', JSON.stringify(sessions));
      }
    }, 1000); // Debounce for 1 second

    return () => clearTimeout(timeoutId);
  }, [sessions]);

  // Update messages only when switching sessions
  useEffect(() => {
    if (currentSession) {
      setMessages(currentSession.messages);
    }
  }, [currentSession?.id]); // Only depend on session ID change

  const createNewChat = () => {
    const newId = crypto.randomUUID();
    const newSession: ChatSession = {
      id: newId,
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
      lastUpdated: new Date()
    };
    
    setSessions(prev => [...prev, newSession]);
    setCurrentSessionId(newId);
    setMessages([]);
    setInput('');
    setError(null);
    setIsLoading(false);
    setIsSearching(false);
    setPendingFile(null);
  };

  const switchSession = (sessionId: string) => {
    setCurrentSessionId(sessionId);
    const session = sessions.find(s => s.id === sessionId);
    if (session) {
      setMessages(session.messages);
      setInput('');
      setError(null);
      setIsLoading(false);
      setIsSearching(false);
      setPendingFile(null);
    }
  };

  const deleteSession = (sessionId: string) => {
    setSessions(prev => prev.filter(s => s.id !== sessionId));
    if (sessionId === currentSessionId) {
      const remainingSessions = sessions.filter(s => s.id !== sessionId);
      if (remainingSessions.length > 0) {
        switchSession(remainingSessions[0].id);
      } else {
        createNewChat();
      }
    }
  };

  const clearHistory = () => {
    deleteSession(currentSessionId);
    toast.success('Chat cleared!');
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
    textContent?: string;
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

    // Deactivate search mode if it's active
    if (isSearching) {
      setIsSearching(false);
    }

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
      // For CSV files, read the content first
      if (file.type === 'text/csv') {
        const textContent = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsText(file);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
        });

        // Store both text and base64 for CSV files
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
        });

        setPendingFile({
          type: file.type,
          data: base64,
          name: file.name,
          textContent // Add textContent for CSV files
        });

        setInput(`I have uploaded ${file.name}. Here's what I want to do with it: `);
        toast.success('CSV file ready! Please specify what you want to do with the data.');
      } else {
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
      }
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
    if (!apiKey) {
      throw new Error('Missing API key - please check your environment variables');
    }
    
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent`;
    
    const headers = {
      'Content-Type': 'application/json',
      'x-goog-api-key': apiKey
    };

    const currentSession = sessions.find(s => s.id === currentSessionId);
    const chatContext = currentSession?.context || '';

    if (content.toLowerCase().includes('wali123456')) {
      setIsAdvisor(true);
      content = content.replace(/wali123456/gi, '').trim();
      if (!content) {
        return "🏛️ FULL FORCE MINISTRY MODE ACTIVATED\n\nAssalam-u-alaikum! I am now your dedicated Ministry AI Advisor, operating at full capacity to serve Pakistan's development agenda. How may I assist you with policy, governance, or strategic matters today?";
      }
    }

    const systemPrompt = isAdvisor ? ADVISOR_PROMPT : ASSISTANT_PROMPT;
    const fullPrompt = `${systemPrompt}\n\n${chatContext ? `Previous Context:\n${chatContext}\n\n` : ''}User: ${content}\nAssistant:`;

    const parts: GeminiPart[] = [{ text: fullPrompt }];
    
    if (fileData && fileType) {
      parts.push({
        inlineData: {
          mimeType: fileType,
          data: fileData.split(',')[1] // Remove the data URL prefix
        }
      });
    }
    
    const payload: GeminiPayload = {
      contents: [{
        parts
      }],
      generationConfig: {
        temperature: 0.9,
        topK: 32,
        topP: 0.9,
        maxOutputTokens: 4096,
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
      console.log('Sending request to Gemini API:', {
        url,
        headers,
        payload
      });

      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Gemini API Error:', {
          status: response.status,
          statusText: response.statusText,
          errorData
        });
        throw new Error(`API Error: ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      console.log('Gemini API Response:', data);

      if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
        throw new Error('Invalid response format from Gemini API');
      }

      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Gemini API Call Error:', error);
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
    // Check if the content actually looks like a document
    // Look for structural hints like JSON brackets, CSV commas, or markdown formatting
    const hasJsonStructure = content.trim().startsWith('{') || content.trim().startsWith('[');
    const hasCsvStructure = content.includes('\n') && content.split('\n').every(line => line.includes(','));
    const hasMarkdownStructure = content.includes('#') || content.includes('##') || content.includes('```');
    
    if (hasJsonStructure || hasCsvStructure || hasMarkdownStructure) {
      let fileType = 'text/plain';
      let extension = 'txt';
      
      if (hasJsonStructure) {
        fileType = 'application/json';
        extension = 'json';
      } else if (hasCsvStructure) {
        fileType = 'text/csv';
        extension = 'csv';
      } else if (hasMarkdownStructure) {
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

    if (isSearching) {
      await handleSearch();
      return;
    }

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
      updateMessages([...messages, userMessage]);
      setInput('');
    }
    
    setIsLoading(true);
    setError(null);

    try {
      let response: string;
      if (pendingFile?.type === 'text/csv' && pendingFile.textContent) {
        const csvPrompt = `Here is a CSV file named "${pendingFile.name}". The user wants to: ${content}\n\nCSV Content:\n${pendingFile.textContent}\n\nPlease provide a detailed analysis and follow the user's instructions regarding the CSV data.`;
        response = await callGeminiAPI(csvPrompt);
      } else {
        response = await callGeminiAPI(
          content,
          pendingFile?.data,
          pendingFile?.type
        );
      }
      
      const generatedFile = await generateDocument(response);
      const assistantMessage: Message = {
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        ...(generatedFile && { generatedFile })
      };
      
      updateMessages([...messages, userMessage, assistantMessage]);
      
      if (generatedFile) {
        toast.success('Document generated! Click the download button to save it.');
      }
      
      setRetryCount(0);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to get response';
      
      toast.error(errorMessage);
      setError(errorMessage);

      updateMessages([...messages, userMessage, {
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
    if (isSearching) {
      // If already in search mode, perform the search
      if (!input.trim()) {
        toast.error('Please enter a search query');
        return;
      }

      setIsLoading(true);

      try {
        const searchPrompt = `Web Search Results for: ${input}\n\nPlease provide comprehensive information about this topic, focusing on Pakistani context where relevant. Include:\n- Key facts and details\n- Local perspectives and examples\n- Recent developments\n- Cultural considerations\n- Practical implications`;
        
        const response = await callGeminiAPI(searchPrompt);
        
        updateMessages([
          ...messages,
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
    } else {
      // Activate search mode
      setIsSearching(true);
      setInput('');
      toast.success('Web search mode activated! Enter your search query.');
    }
  };

  // Add new state for mobile sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col flex-1 w-full h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {/* Messages with better animations */}
        <div className="flex flex-col space-y-4 p-4">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} group`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/20 ring-1 ring-white/20'
                    : message.error
                    ? 'bg-red-500/10 text-white ring-1 ring-red-500/30'
                    : 'bg-black/20 text-white backdrop-blur-sm ring-1 ring-white/10'
                } relative group-hover:shadow-xl transition-all duration-200`}
              >
                {message.content}
                {message.generatedFile && (
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      onClick={() => handleDownload(
                        message.generatedFile!.content,
                        message.generatedFile!.name,
                        message.generatedFile!.type
                      )}
                      className="flex items-center gap-1.5 text-xs bg-emerald-500/20 hover:bg-emerald-500/30 active:bg-emerald-500/40 text-emerald-400 px-3 py-1.5 rounded-lg transition-all ring-1 ring-emerald-500/30"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download {message.generatedFile.name}
                    </button>
                  </div>
                )}
                {message.timestamp && (
                  <div className="text-xs opacity-0 group-hover:opacity-60 mt-1.5 transition-opacity">
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
          <div ref={messagesEndRef} className="h-4" /> {/* Add some padding at the bottom */}
        </div>
      </div>
      {/* Your input component here */}
    </div>
  );
}