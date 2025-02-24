'use client';

import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
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

const ChatWrapper = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>('');
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize sessions from localStorage on client-side only
  useEffect(() => {
    const savedSessions = localStorage.getItem('chatSessions');
    const parsedSessions = savedSessions ? JSON.parse(savedSessions) : [{
      id: crypto.randomUUID(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
      lastUpdated: new Date()
    }];
    
    setSessions(parsedSessions);
    setCurrentSessionId(parsedSessions[0]?.id || '');
    setIsInitialized(true);
  }, []);

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
      </div>
    );
  }

  return <Chat initialSessions={sessions} initialSessionId={currentSessionId} />;
};

const Chat = ({ 
  initialSessions,
  initialSessionId 
}: { 
  initialSessions: ChatSession[];
  initialSessionId: string;
}) => {
  const [sessions, setSessions] = useState(initialSessions);
  const [currentSessionId, setCurrentSessionId] = useState(initialSessionId);
  const [messages, setMessages] = useState<Message[]>([]);

  // Memoize current session to prevent unnecessary re-renders
  const currentSession = useMemo(() => 
    sessions.find(s => s.id === currentSessionId),
    [sessions, currentSessionId]
  );

  // Add mounted ref
  const mounted = useRef(true);

  // Add cleanup
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  // Update state setters to check mounted status
  const safeSetMessages = useCallback((newMessages: Message[]) => {
    if (mounted.current) {
      setMessages(newMessages);
    }
  }, []);

  const safeSetInput = useCallback((value: string) => {
    if (mounted.current) {
      setInput(value);
    }
  }, []);

  const safeSetError = useCallback((value: string | null) => {
    if (mounted.current) {
      setError(value);
    }
  }, []);

  const safeSetLoading = useCallback((value: boolean) => {
    if (mounted.current) {
      setIsLoading(value);
    }
  }, []);

  // Update the updateMessages function to use safeSetMessages
  const updateMessages = useCallback((newMessages: Message[]) => {
    safeSetMessages(newMessages);
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
  }, [currentSessionId, safeSetMessages]);

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

  // Add formatted dates state
  const [formattedDates, setFormattedDates] = useState<{[key: string]: string}>({});

  // Format dates on client side only
  useEffect(() => {
    const formatDates = () => {
      const newFormattedDates: {[key: string]: string} = {};
      sessions.forEach(session => {
        newFormattedDates[session.id] = new Date(session.lastUpdated).toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      });
      setFormattedDates(newFormattedDates);
    };
    formatDates();
  }, [sessions]);

  // Add message timestamps state
  const [messageTimestamps, setMessageTimestamps] = useState<{[key: number]: string}>({});

  // Format message timestamps on client side only
  useEffect(() => {
    const formatMessageDates = () => {
      const newTimestamps: {[key: number]: string} = {};
      messages.forEach((message, index) => {
        if (message.timestamp) {
          newTimestamps[index] = new Date(message.timestamp).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          });
        }
      });
      setMessageTimestamps(newTimestamps);
    };
    formatMessageDates();
  }, [messages]);

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
    console.log('Using API Key:', apiKey?.substring(0, 8) + '...');
    
    if (!apiKey) {
      throw new Error('Missing API key - please check your .env.local file');
    }
    
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    
    const headers = {
      'Content-Type': 'application/json'
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
      safeSetInput('');
    }
    
    safeSetLoading(true);
    safeSetError(null);

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
      
      if (mounted.current) {
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
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to get response';
      
      if (mounted.current) {
        toast.error(errorMessage);
        safeSetError(errorMessage);

        updateMessages([...messages, userMessage, {
          role: 'assistant',
          content: errorMessage,
          timestamp: new Date(),
          error: true
        }]);
      }
    } finally {
      if (mounted.current) {
        safeSetLoading(false);
        setPendingFile(null);
      }
    }
  };

  const handleSearch = async () => {
    if (isSearching) {
      // If already in search mode, perform the search
      if (!input.trim()) {
        toast.error('Please enter a search query');
        return;
      }

      safeSetLoading(true);

      try {
        const searchPrompt = `Web Search Results for: ${input}\n\nPlease provide comprehensive information about this topic, focusing on Pakistani context where relevant. Format the response elegantly with:\n\n• Key Facts & Details\n• Local Perspectives & Examples\n• Recent Developments\n• Cultural Considerations\n• Practical Implications\n\nUse "•" for bullet points, and format section headings in bold. Keep the tone professional yet accessible.`;
        
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
            content: `### Search Results: "${input}"\n\n${response}`,
            timestamp: new Date()
          }
        ]);
      } catch (error) {
        console.error('Search error:', error);
        toast.error('Search failed. Please try again.');
      } finally {
        setIsSearching(false);
        safeSetLoading(false);
        safeSetInput('');
      }
    } else {
      // Activate search mode
      setIsSearching(true);
      safeSetInput('');
      toast.success('Web search mode activated! Enter your search query.');
    }
  };

  // Add new state for mobile sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Add chat suggestions
  const chatSuggestions = [
    {
      text: "پاکستان کی معیشت کے بارے میں بتائیں",
      icon: "📊",
      category: "Economy"
    },
    {
      text: "How can AI improve Pakistan's education?",
      icon: "🎓",
      category: "Education"
    },
    {
      text: "Latest developments in Pakistan's tech sector",
      icon: "💻",
      category: "Technology"
    },
    {
      text: "Analyze Pakistan's renewable energy potential",
      icon: "🌱",
      category: "Energy"
    },
    {
      text: "Smart city initiatives in Pakistan",
      icon: "🏙️",
      category: "Urban"
    },
    {
      text: "Digital transformation roadmap for government",
      icon: "🏛️",
      category: "Governance"
    }
  ];

  const handleSuggestionClick = (suggestion: string) => {
    safeSetInput(suggestion);
    // Focus the input
    const inputElement = document.querySelector('input[type="text"]') as HTMLInputElement;
    if (inputElement) {
      inputElement.focus();
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-full w-full relative">
      {/* Mobile Menu Button - Fixed bottom right */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed bottom-[88px] right-4 z-[60] p-3 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 backdrop-blur-xl rounded-full text-white shadow-lg shadow-emerald-500/20 ring-1 ring-white/20 transition-all"
      >
        <MessageCircle className="w-5 h-5" />
      </button>

      {/* Mobile Bottom Sheet */}
      <div 
        className={`
          lg:hidden fixed inset-x-0 bottom-0 z-50 transition-all duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-y-0' : 'translate-y-full'}
          bg-black/95 backdrop-blur-2xl border-t border-white/10 
          rounded-t-[28px] pb-safe-or-4
          max-h-[85vh] overflow-hidden flex flex-col
          shadow-[0_-8px_32px_rgba(0,0,0,0.5)]
        `}
      >
        {/* Pull indicator */}
        <div className="p-2 flex justify-center touch-none">
          <div className="w-10 h-1 bg-white/20 rounded-full"></div>
        </div>
        
        {/* Mobile sidebar content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-medium text-white">Your Chats</h2>
              <button
                onClick={createNewChat}
                className="flex items-center justify-center p-2 bg-emerald-500/20 hover:bg-emerald-500/30 active:bg-emerald-500/40 text-emerald-400 rounded-lg transition-all ring-1 ring-emerald-500/30 touch-none"
              >
                <PlusCircle className="w-4 h-4" />
              </button>
            </div>
            
            {/* Chat list */}
            <div className="space-y-1.5 mt-2 pb-safe-or-4">
              {sessions.map(session => (
                <div key={session.id} className="flex items-center gap-2 group touch-none">
                  <div
                    onClick={() => {
                      switchSession(session.id);
                      setIsSidebarOpen(false);
                    }}
                    className={`flex-1 flex items-center gap-2 px-3 py-2.5 rounded-lg transition-all cursor-pointer ${
                      session.id === currentSessionId
                        ? 'bg-emerald-500/20 text-white ring-1 ring-emerald-500/30'
                        : 'text-white/70 hover:bg-white/5 active:bg-white/10'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate text-left text-sm">{session.title}</span>
                    <span className="text-[10px] opacity-60 ml-auto flex-shrink-0">
                      {formattedDates[session.id] || ''}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteSession(session.id)}
                    className="p-2 text-white/50 hover:text-white hover:bg-red-500/20 active:bg-red-500/30 rounded-lg transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-[300px] h-full flex-col bg-black/40 backdrop-blur-xl border-r border-white/10">
        <div className="p-3 flex items-center justify-between border-b border-white/10">
          <h2 className="text-base font-medium text-white">Chats</h2>
          <button
            onClick={createNewChat}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 active:bg-white/20 rounded-lg transition-all"
            title="New Chat"
          >
            <PlusCircle className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-2 space-y-1 scrollbar-thin scrollbar-thumb-white/10">
          {sessions.map(session => (
            <div key={session.id} className="px-2">
              <div
                onClick={() => switchSession(session.id)}
                className={`w-full flex items-center gap-3 px-2 py-2 rounded-lg transition-all group cursor-pointer ${
                  session.id === currentSessionId
                    ? 'bg-emerald-500/20 text-white'
                    : 'text-white/70 hover:bg-white/5'
                }`}
              >
                <MessageCircle className="w-4 h-4 flex-shrink-0" />
                <span className="truncate text-left text-sm">{session.title}</span>
                <span className="text-xs opacity-60 ml-auto">{formattedDates[session.id] || ''}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteSession(session.id);
                  }}
                  className="ml-2 p-1 opacity-0 group-hover:opacity-100 text-white/40 hover:text-white hover:bg-white/10 rounded transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-dvh lg:h-full w-full">
        {/* Header */}
        <div className="flex justify-between items-center h-14 px-4 bg-black/20 backdrop-blur-xl shrink-0 border-b border-white/5">
          <h2 className="text-white text-base font-medium tracking-wide flex items-center gap-2">
            <span className="text-lg">🇵🇰</span>
            <span className="bg-gradient-to-r from-emerald-400 to-emerald-200 bg-clip-text text-transparent">Pakistan AI</span>
          </h2>
          <button
            onClick={clearHistory}
            className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-all"
            title="Clear chat"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Messages Container with Scroll */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          <div className="flex flex-col space-y-4 p-4 pb-safe-or-6">
            {messages.length === 0 && (
              <div className="text-center text-white/90 mt-6 sm:mt-8">
                <p className="mb-3 text-lg sm:text-xl font-medium [text-shadow:0_1px_2px_rgba(0,0,0,0.1)]">
                  <span className="bg-gradient-to-r from-emerald-400 to-emerald-200 bg-clip-text text-transparent">السَّلامُ عَلَيْكُم</span> 👋
                </p>
                <p className="text-base sm:text-lg mb-6">How may I assist you today?</p>
                <div className="max-w-2xl mx-auto">
                  <div className="text-sm bg-black/20 backdrop-blur-lg rounded-2xl p-4 shadow-xl ring-1 ring-white/10 hover:ring-white/20 transition-all mb-6">
                    <p className="mb-2 text-emerald-400 font-medium">You can:</p>
                    <ul className="space-y-2 text-white/80">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-gradient-to-r from-emerald-400 to-emerald-300 rounded-full"></span>
                        Ask questions in English or Urdu
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-gradient-to-r from-emerald-400 to-emerald-300 rounded-full"></span>
                        Upload documents for analysis
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-gradient-to-r from-emerald-400 to-emerald-300 rounded-full"></span>
                        Search for latest information
                      </li>
                    </ul>
                  </div>

                  {/* Chat Suggestions */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-white/70">Try asking about:</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-w-3xl mx-auto px-1">
                      {chatSuggestions.map((suggestion, index) => (
                        <motion.button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion.text)}
                          className="group flex items-start gap-3 p-3 bg-black/20 hover:bg-black/30 active:bg-black/40 backdrop-blur-sm rounded-xl ring-1 ring-white/10 hover:ring-emerald-500/30 transition-all text-left"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="text-xl group-hover:scale-110 transition-transform">
                            {suggestion.icon}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-white/90 group-hover:text-white transition-colors line-clamp-2">
                              {suggestion.text}
                            </p>
                            <span className="text-xs text-emerald-400/70 group-hover:text-emerald-400 transition-colors">
                              {suggestion.category}
                            </span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Messages */}
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
                      {messageTimestamps[index] || ''}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="flex justify-start"
              >
                <div className="bg-black/20 backdrop-blur-sm rounded-2xl px-4 py-3 ring-1 ring-white/10">
                  <Loader2 className="w-5 h-5 animate-spin text-emerald-400" />
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} className="h-4" />
          </div>
        </div>

        {/* Input Container */}
        <div className="w-full bg-gradient-to-t from-black/80 to-black/40 backdrop-blur-xl border-t border-white/10">
          <div className="px-4 py-3 lg:py-4 pb-safe-or-6 mb-20 lg:mb-0">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <div className="flex items-center gap-1.5">
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                    title="Upload file"
                  >
                    <FileUp className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleSearch}
                    disabled={isLoading}
                    className={`p-2 text-white/70 hover:text-white rounded-lg transition-all ${
                      isSearching 
                        ? 'bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/30' 
                        : 'hover:bg-white/10'
                    }`}
                    title={isSearching ? "Search" : "Web Search"}
                  >
                    <Search className="w-5 h-5" />
                  </button>
                </div>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => safeSetInput(e.target.value)}
                  placeholder={
                    pendingFile 
                      ? `Instructions for ${pendingFile.name}...`
                      : isSearching 
                      ? "Search..." 
                      : "Type message..."
                  }
                  className="flex-1 bg-black/20 text-white placeholder-white/50 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-sm transition-all min-h-[40px] max-h-[120px]"
                  disabled={isLoading}
                />
                {error ? (
                  <button
                    type="button"
                    onClick={handleRetry}
                    disabled={isLoading || retryCount >= 3}
                    className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all disabled:opacity-50"
                    title="Retry"
                  >
                    <RefreshCcw className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="p-2 text-white/70 hover:text-white hover:bg-emerald-500/20 rounded-lg transition-all disabled:opacity-50"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Status indicators */}
              {(pendingFile || error) && (
                <div className="flex items-center gap-2 px-1">
                  {pendingFile && (
                    <span className="text-emerald-400 flex items-center gap-1.5 text-xs">
                      <span className="w-1.5 h-1.5 bg-gradient-to-r from-emerald-400 to-emerald-300 rounded-full animate-pulse"></span>
                      File ready
                    </span>
                  )}
                  {error && (
                    <span className="text-red-400 flex items-center gap-1.5 text-xs">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {error}
                    </span>
                  )}
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx,.txt,.csv,image/*,application/json"
                className="hidden"
              />
            </form>
          </div>
        </div>
      </div>

      {/* Mobile backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-md z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default ChatWrapper;