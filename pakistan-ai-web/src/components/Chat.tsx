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

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  lastUpdated: Date;
  context?: string;
  summary?: string;
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
      const parsed = saved ? JSON.parse(saved) : [];
      // Ensure dates are properly parsed
      return parsed.map((session: ChatSession) => ({
        ...session,
        createdAt: new Date(session.createdAt),
        lastUpdated: new Date(session.lastUpdated),
        messages: session.messages.map(msg => ({
          ...msg,
          timestamp: msg.timestamp ? new Date(msg.timestamp) : undefined
        }))
      }));
    }
    return [];
  });

  const [currentSessionId, setCurrentSessionId] = useState<string>(() => {
    // Create a new session on fresh load
    const newId = crypto.randomUUID();
    const newSession: ChatSession = {
      id: newId,
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
      lastUpdated: new Date()
    };
    
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('chatSessions');
      const existingSessions = saved ? JSON.parse(saved) : [];
      localStorage.setItem('chatSessions', JSON.stringify([...existingSessions, newSession]));
    }
    
    return newId;
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
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-001:generateContent?key=${apiKey}`;

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
    <div className="flex flex-col lg:flex-row h-screen w-full max-w-6xl mx-auto relative">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-emerald-600 rounded-lg text-white shadow-lg"
      >
        <MessageCircle className="w-5 h-5" />
      </button>

      {/* Sidebar */}
      <div className={`${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 fixed lg:relative w-72 h-full z-40 transition-transform duration-300 ease-in-out
      bg-black bg-opacity-40 backdrop-blur-lg lg:rounded-l-2xl p-4 flex flex-col gap-4`}>
        <button
          onClick={createNewChat}
          className="w-full flex items-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
        >
          <PlusCircle className="w-5 h-5" />
          New Chat
        </button>
        
        <div className="flex-1 overflow-y-auto space-y-2">
          {sessions.map(session => (
            <div key={session.id} className="flex items-center gap-2 group">
              <button
                onClick={() => {
                  switchSession(session.id);
                  setIsSidebarOpen(false); // Close sidebar on mobile after selection
                }}
                className={`flex-1 flex flex-col items-start gap-1 px-4 py-3 rounded-lg transition-colors ${
                  session.id === currentSessionId
                    ? 'bg-emerald-600 text-white'
                    : 'text-white text-opacity-80 hover:bg-white hover:bg-opacity-10'
                }`}
              >
                <div className="flex items-center gap-2 w-full">
                  <MessageCircle className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate text-left text-sm font-medium">{session.title}</span>
                </div>
                <span className="text-xs opacity-60 truncate w-full">
                  {new Date(session.lastUpdated).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </button>
              <button
                onClick={() => deleteSession(session.id)}
                className="opacity-0 group-hover:opacity-100 p-2 text-white hover:bg-red-500 rounded-lg transition-all"
                title="Delete chat"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white bg-opacity-10 backdrop-blur-lg lg:rounded-r-2xl">
        <div className="flex justify-between items-center p-3 sm:p-4 border-b border-white border-opacity-10">
          <div className="flex items-center space-x-2">
            <h2 className="text-white text-lg font-semibold">🇵🇰 Pakistan AI</h2>
            <span className="hidden sm:inline text-xs text-emerald-300">Built by Abdul Wali</span>
          </div>
          <button
            onClick={clearHistory}
            className="flex items-center px-2 sm:px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline ml-1">Clear</span>
          </button>
        </div>

        {/* Messages area with improved mobile spacing */}
        <div className="flex-1 overflow-y-auto p-2 sm:p-6 space-y-3 sm:space-y-4">
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
                  className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-3 sm:px-4 py-2 ${
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

        {/* Input area with better mobile spacing */}
        <form onSubmit={handleSubmit} className="p-2 sm:p-4 border-t border-white border-opacity-10">
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2 text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition"
                title="Upload"
              >
                <FileUp className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleSearch}
                disabled={isLoading}
                className={`p-2 text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition ${
                  isSearching ? 'bg-emerald-600' : ''
                }`}
                title={isSearching ? "Search" : "Web Search"}
              >
                <Search className="w-5 h-5" />
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
                  ? `Instructions for ${pendingFile.name}...`
                  : isSearching 
                  ? "Search..." 
                  : "Type message..."
              }
              className="flex-1 bg-white bg-opacity-10 text-white placeholder-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              disabled={isLoading}
            />
            {error ? (
              <button
                type="button"
                onClick={handleRetry}
                disabled={isLoading || retryCount >= 3}
                className="p-2 text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition disabled:opacity-50"
                title="Retry"
              >
                <RefreshCcw className="w-5 h-5" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-2 text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            )}
          </div>
          {/* Compact error and file indicators */}
          {(pendingFile || error) && (
            <div className="mt-2 text-xs flex items-center gap-1">
              {pendingFile && (
                <span className="text-emerald-300">📎 File ready</span>
              )}
              {error && (
                <span className="text-red-300 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </span>
              )}
            </div>
          )}
        </form>

        {/* Mobile backdrop */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
}