"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { io, Socket } from "socket.io-client";

interface Message {
  id: string;
  text: string;
  isMine: boolean;
  timestamp: Date;
  reaction?: string;
  replyToId?: string;
}

export default function ChatPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isPrivate = !!searchParams.get("invite");
  const [timeLeft, setTimeLeft] = useState(isPrivate ? -1 : 60);
  const [messages, setMessages] = useState<Message[]>([
    { id: "sys-1", text: isPrivate ? "You're now in a private chat." : "You're now chatting anonymously.", isMine: false, timestamp: new Date() }
  ]);
  const [inputText, setInputText] = useState("");
  const [extended, setExtended] = useState(false);
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);
    
    newSocket.on("connect", () => {
      newSocket.emit("join_chat", { 
        isPrivate, 
        inviteCode: searchParams.get("invite") 
      });
    });

    newSocket.on("chat_started", () => {
      setMessages([{ id: "sys-start", text: "You've been matched! Say hi.", isMine: false, timestamp: new Date() }]);
      setTimeLeft(60); // Reset timer when matched
    });
    
    newSocket.on("stranger_joined", () => {
      setMessages([{ id: "sys-join", text: "Stranger has joined the private chat.", isMine: false, timestamp: new Date() }]);
    });

    newSocket.on("receive_message", (msg) => {
      setMessages(prev => [...prev, { ...msg, isMine: false, timestamp: new Date() }]);
    });

    newSocket.on("receive_reaction", ({ msgId, emoji }) => {
      setMessages(prev => prev.map(m => m.id === msgId ? { ...m, reaction: emoji } : m));
    });

    newSocket.on("chat_extended", () => {
      setTimeLeft(prev => prev + 60);
      setMessages(prev => [...prev, { id: Date.now().toString(), text: "Stranger extended the chat.", isMine: false, timestamp: new Date() }]);
    });

    newSocket.on("stranger_left", () => {
      setMessages(prev => [...prev, { id: "sys-left", text: "Stranger disconnected.", isMine: false, timestamp: new Date() }]);
    });

    return () => {
      newSocket.close();
    };
  }, [isPrivate, searchParams]);

  useEffect(() => {
    if (isPrivate) return; 
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [extended, isPrivate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    const newMsg = { 
      id: Date.now().toString(), 
      text: inputText, 
      replyToId: replyingTo?.id 
    };

    setMessages((prev) => [
      ...prev, 
      { ...newMsg, isMine: true, timestamp: new Date() }
    ]);
    
    if (socket) {
      socket.emit("send_message", newMsg);
    }
    
    setInputText("");
    setReplyingTo(null);
  };

  const handleReact = (msgId: string, emoji: string) => {
    const newEmoji = messages.find(m => m.id === msgId)?.reaction === emoji ? undefined : emoji;
    setMessages((prev) => prev.map(m => m.id === msgId ? { ...m, reaction: newEmoji } : m));
    
    if (socket && newEmoji) {
      socket.emit("react_message", { msgId, emoji: newEmoji });
    }
  };

  const handleExtend = () => {
    if (!extended && !isPrivate) {
      setExtended(true);
      setTimeLeft((prev) => prev + 60);
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), text: "You requested to extend the chat.", isMine: true, timestamp: new Date() }
      ]);
      if (socket) {
        socket.emit("extend_chat");
      }
    }
  };

  if (!isPrivate && timeLeft === 0) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-black text-white">
        <div className="w-full max-w-md text-center p-8 bg-surface-elevated border border-border-subtle rounded-2xl animate-in fade-in zoom-in duration-500 shadow-[0_0_40px_rgba(4,116,196,0.15)]">
          <div className="text-5xl mb-4 animate-bounce">⌛</div>
          <h1 className="text-3xl font-extrabold mb-2">Time's up!</h1>
          <p className="text-text-secondary mb-8 text-lg">
            The 60 seconds are over. Hope you had a good conversation.
          </p>
          <div className="flex flex-col gap-3">
            <button 
              onClick={() => router.push("/random")}
              className="bg-primary text-white font-semibold py-4 px-6 rounded-xl hover:bg-primary/90 transition-colors shadow-lg"
            >
              Find Someone Else
            </button>
            <Link 
              href="/"
              className="bg-transparent text-text-secondary font-medium py-4 px-6 rounded-xl border border-border-subtle hover:bg-blue-darker hover:text-white transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen bg-[#050505] text-white justify-center">
      {/* Centered Chat Window Container */}
      <div className="w-full max-w-4xl flex flex-col min-h-screen bg-[#0A0D14] md:border-x border-border-subtle/50 relative shadow-2xl">
        
        {/* Header */}
        <header className="sticky top-0 z-20 bg-[#0A0D14]/90 backdrop-blur-xl border-b border-border-subtle/50 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-text-secondary hover:text-white transition-colors p-2 -ml-2 rounded-full hover:bg-white/5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </Link>
            <div className="flex flex-col">
              <div className="font-bold text-lg tracking-wide flex items-center gap-2">
                Stranger
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              </div>
              <div className="text-xs text-text-secondary">Connected securely</div>
            </div>
          </div>
          
          {!isPrivate && (
            <div className="flex items-center gap-4">
              <div className={`font-mono text-lg font-bold px-4 py-1.5 rounded-xl border transition-colors ${timeLeft <= 10 ? 'text-red-400 border-red-900/50 bg-red-900/20 shadow-[0_0_15px_rgba(220,38,38,0.2)]' : 'text-primary border-primary/30 bg-primary/10 shadow-[0_0_15px_rgba(4,116,196,0.1)]'}`}>
                00:{timeLeft.toString().padStart(2, '0')}
              </div>
              <button 
                onClick={handleExtend}
                disabled={extended}
                className={`px-4 py-2 text-xs font-bold uppercase rounded-xl border transition-all duration-300 ${
                  extended 
                    ? 'bg-surface-elevated text-text-secondary/50 border-border-subtle cursor-not-allowed opacity-50' 
                    : 'bg-transparent text-accent-light border-accent-light hover:bg-accent-light/10 hover:shadow-[0_0_15px_rgba(143,217,251,0.2)] cursor-pointer'
                }`}
              >
                {extended ? 'Extended' : '+60s'}
              </button>
            </div>
          )}
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-6 overflow-x-hidden relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
          
          <div className="text-center text-xs font-medium text-text-secondary/40 my-4 bg-black/40 py-1.5 px-4 rounded-full mx-auto backdrop-blur-sm border border-border-subtle/30">
            Conversation started at {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </div>
          
          {messages.map((msg) => {
            const repliedMsg = msg.replyToId ? messages.find(m => m.id === msg.replyToId) : null;
            
            return (
              <div 
                key={msg.id} 
                className={`flex w-full animate-in slide-in-from-bottom-2 fade-in duration-300 group relative ${msg.isMine ? 'justify-end' : 'justify-start'}`}
              >
                {/* Quick Actions (Hover on Desktop, Always on Mobile) */}
                {msg.id !== "sys-1" && (
                  <div className={`flex items-center gap-2 mx-3 transition-opacity duration-200 opacity-100 md:opacity-0 md:group-hover:opacity-100 ${msg.isMine ? 'order-1' : 'order-2'}`}>
                    <button 
                      onClick={() => handleReact(msg.id, '❤️')}
                      className="p-2 text-text-secondary hover:text-red-400 bg-surface-elevated/80 hover:bg-surface-elevated rounded-full transition-all border border-border-subtle shadow-sm cursor-pointer"
                      title="React with Heart"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none" className={msg.reaction === '❤️' ? "text-red-500" : ""}>
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                    </button>
                    <button 
                      onClick={() => setReplyingTo(msg)}
                      className="p-2 text-text-secondary hover:text-primary bg-surface-elevated/80 hover:bg-surface-elevated rounded-full transition-all border border-border-subtle shadow-sm cursor-pointer"
                      title="Reply"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 17 4 12 9 7"></polyline>
                        <path d="M20 18v-2a4 4 0 0 0-4-4H4"></path>
                      </svg>
                    </button>
                  </div>
                )}

                <div className={`relative px-5 py-3.5 max-w-[85%] md:max-w-[75%] flex flex-col gap-1.5 text-[15px] shadow-sm ${
                  msg.isMine 
                    ? 'bg-primary text-white rounded-2xl rounded-tr-sm order-2 shadow-[0_4px_15px_rgba(4,116,196,0.15)]' 
                    : 'bg-[#1C2333] text-white rounded-2xl rounded-tl-sm border border-border-subtle/50 order-1 shadow-[0_4px_15px_rgba(0,0,0,0.2)]'
                }`}>
                  {/* Replied Message Bubble */}
                  {repliedMsg && (
                    <div className={`text-sm p-2.5 rounded-xl border-l-4 mb-1 cursor-pointer transition-opacity hover:opacity-80 ${msg.isMine ? 'bg-black/20 border-white text-white' : 'bg-black/30 border-primary text-text-secondary'}`}>
                      <span className="font-bold block mb-0.5 text-xs tracking-wide uppercase">{repliedMsg.isMine ? 'You' : 'Stranger'}</span>
                      <span className="truncate block opacity-90">{repliedMsg.text}</span>
                    </div>
                  )}
                  
                  {/* Actual Message */}
                  <div className="leading-relaxed whitespace-pre-wrap">{msg.text}</div>
                  
                  {/* Reaction */}
                  {msg.reaction && (
                    <div className={`absolute -bottom-3 ${msg.isMine ? '-left-2' : '-right-2'} bg-[#151A2F] border border-border-subtle rounded-full px-2 py-1 text-base shadow-lg animate-in zoom-in duration-200 z-10 flex items-center justify-center min-w-[28px] min-h-[28px]`}>
                      {msg.reaction}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} className="h-4" />
        </div>

        {/* Input Section */}
        <div className="bg-[#0A0D14]/90 backdrop-blur-xl border-t border-border-subtle/50 flex flex-col w-full pb-safe z-20">
          
          {/* Replying To Banner */}
          {replyingTo && (
            <div className="flex items-center justify-between px-6 py-3 bg-[#1C2333]/80 border-b border-border-subtle/50 text-sm animate-in slide-in-from-bottom-2 duration-200">
              <div className="flex flex-col flex-1 overflow-hidden border-l-2 border-primary pl-3">
                <span className="text-primary font-bold text-xs mb-0.5 uppercase tracking-wide">Replying to {replyingTo.isMine ? 'yourself' : 'stranger'}</span>
                <span className="text-text-secondary truncate">{replyingTo.text}</span>
              </div>
              <button onClick={() => setReplyingTo(null)} className="text-text-secondary hover:text-white p-2 rounded-full hover:bg-white/5 transition-colors cursor-pointer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          )}

          {/* Input Form */}
          <form onSubmit={handleSend} className="flex items-end gap-3 relative p-4 md:p-6">
            <div className="flex-1 relative flex items-center bg-[#151A2F] border border-border-subtle rounded-2xl shadow-inner transition-colors focus-within:border-primary/50 focus-within:bg-[#1C2333]">
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type a message..." 
                className="w-full bg-transparent px-5 py-4 text-white placeholder-text-secondary/50 focus:outline-none"
              />
            </div>
            
            <button 
              type="submit"
              disabled={!inputText.trim()}
              className="p-4 bg-primary text-white rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-all duration-300 shadow-[0_4px_15px_rgba(4,116,196,0.25)] hover:shadow-[0_4px_20px_rgba(4,116,196,0.4)] flex-shrink-0 cursor-pointer"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-0.5">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
