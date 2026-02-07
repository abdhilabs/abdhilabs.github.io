import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

// Initial greeting message
const INITIAL_GREETING = "Hai! 👋 Saya Anak Intern, asisten digital Abdhi. Tanya aja tentang:\n\n• Pengalaman kerja & career\n• Skills & expertise\n• Education & background\n• Awards & achievements\n• Cara menghubungi\n\nApa yang ingin kamu tahu?";

// Fallback responses when API is unavailable
const FALLBACK_RESPONSES = {
  experience: "**Pengalaman Abdhi:**\n\n📱 Mobile Engineer - iOS @ NBS (Jul 2021 - Sekarang)\n📱 Mobile Developer @ HEPTACO (Dec 2020 - Jun 2021)\n📱 iOS/Android Developer @ KECILIN\n📱 Android Developer @ Widya Edu, Credeva, Teman Kajian\n\n4+ tahun pengalaman di mobile development!",
  
  skills: "**Tech Skills:**\n\n🍎 iOS: Swift, SwiftUI, Clean Architecture\n🤖 Android: Kotlin, Java\n🎯 Focus: Mobile architecture, UX, Clean code\n\nCertified dari Apple Developer Academy!",
  
  education: "**Education:**\n\n🍎 Apple Developer Academy @ Infinite Learning (2022)\n🎓 AMIKOM Yogyakarta - Informatika, GPA 3.61\n🎓 Bangkit Academy led by Google (2021)\n📚 Dicoding Academy - Android & iOS Path",
  
  awards: "**Awards:**\n\n🏆 ASEAN Outstanding Invention Award (Thailand 2020)\n🥇 Gold Medal - Asian Youth Innovation (Malaysia 2020)\n🥇 Gold Medal - Thailand Inventors Day 2020\n🏅 1st Winner IT Competition IFest 2020",
  
  contact: "**Contact Abdhi:**\n\n💼 LinkedIn: linkedin.com/in/rizaabdhi\n💻 GitHub: github.com/abdhilabs\n🌐 Website: abdhilabs.com",
  
  default: "Hmm, koneksi lagi bermasalah 😅\n\nCoba tanya lagi ya! Atau langsung hubungi via LinkedIn:\nlinkedin.com/in/rizaabdhi"
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'bot',
      content: INITIAL_GREETING,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const getFallbackResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('pengalaman') || lowerMessage.includes('experience') || lowerMessage.includes('kerja')) {
      return FALLBACK_RESPONSES.experience;
    }
    if (lowerMessage.includes('skill') || lowerMessage.includes('keahlian') || lowerMessage.includes('tech')) {
      return FALLBACK_RESPONSES.skills;
    }
    if (lowerMessage.includes('pendidikan') || lowerMessage.includes('education') || lowerMessage.includes('kuliah')) {
      return FALLBACK_RESPONSES.education;
    }
    if (lowerMessage.includes('award') || lowerMessage.includes('penghargaan') || lowerMessage.includes('juara')) {
      return FALLBACK_RESPONSES.awards;
    }
    if (lowerMessage.includes('contact') || lowerMessage.includes('hubungi') || lowerMessage.includes('linkedin')) {
      return FALLBACK_RESPONSES.contact;
    }
    
    return FALLBACK_RESPONSES.default;
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.content,
          context: 'personal-brand'
        })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();

      const botMessage = {
        id: Date.now() + 1,
        role: 'bot',
        content: data.response || getFallbackResponse(userMessage.content),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      
      // Use fallback response based on message content
      const fallbackResponse = getFallbackResponse(userMessage.content);
      
      const errorMessage = {
        id: Date.now() + 1,
        role: 'bot',
        content: fallbackResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300",
          "bg-black dark:bg-white text-white dark:text-black",
          "hover:scale-110 active:scale-95",
          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white",
          isOpen && "opacity-0 pointer-events-none"
        )}
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Panel */}
      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 w-96 h-[32rem] max-w-[calc(100vw-2rem)]",
          "bg-white dark:bg-gray-900 rounded-2xl shadow-2xl",
          "flex flex-col overflow-hidden",
          "transition-all duration-300 ease-out",
          "border border-gray-200 dark:border-gray-700",
          isOpen
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-black dark:bg-white">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gray-800 dark:bg-gray-200 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white dark:text-black" />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></span>
            </div>
            <div>
              <h3 className="font-semibold text-white dark:text-black text-sm">Anak Intern</h3>
              <p className="text-xs text-gray-300 dark:text-gray-400">Personal Assistant</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-800 dark:hover:bg-gray-200 rounded-full transition-colors"
            aria-label="Close chat"
          >
            <X className="w-5 h-5 text-white dark:text-black" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-950">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-2",
                message.role === 'user' && "flex-row-reverse"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                message.role === 'bot'
                  ? "bg-black dark:bg-white"
                  : "bg-gray-400 dark:bg-gray-600"
              )}>
                {message.role === 'bot' ? (
                  <Bot className="w-4 h-4 text-white dark:text-black" />
                ) : (
                  <User className="w-4 h-4 text-white" />
                )}
              </div>
              <div className={cn(
                "max-w-[80%] rounded-2xl px-4 py-2",
                message.role === 'bot'
                  ? "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-tl-none"
                  : "bg-black dark:bg-white text-white dark:text-black rounded-tr-none"
              )}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                <p className={cn(
                  "text-xs mt-1",
                  message.role === 'bot'
                    ? "text-gray-400"
                    : "text-gray-300 dark:text-gray-600"
                )}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-black dark:bg-white flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white dark:text-black" />
              </div>
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl rounded-tl-none px-4 py-3">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                  <span className="text-sm text-gray-500">Mengetik...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Tanya tentang Abdhi..."
              className="flex-1 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-shadow"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className={cn(
                "p-2 rounded-full transition-colors",
                input.trim() && !isLoading
                  ? "bg-black dark:bg-white text-white dark:text-black hover:scale-105"
                  : "bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
              )}
              aria-label="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatWidget;
