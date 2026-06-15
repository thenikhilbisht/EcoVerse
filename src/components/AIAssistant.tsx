"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, X, Minimize2, Leaf, Sparkles } from "lucide-react";
import {
  getResponse,
  sanitizeMessage,
  registerMessage,
  MAX_MESSAGE_LENGTH,
} from "@/lib/aiAssistantUtils";

type Message = { role: "user" | "ai"; text: string; };

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", text: "Hi! I'm EcoBot 🌱 Your sustainability guide. How can I help you reduce your carbon footprint today?" }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [rateWarning, setRateWarning] = useState(false);
  const sentTimestamps = useRef<number[]>([]);
  const messagesEnd = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (customText?: string) => {
    const userMsg = sanitizeMessage(customText ?? input);
    if (!userMsg) return;

    const { allowed, timestamps } = registerMessage(sentTimestamps.current);
    if (!allowed) {
      setRateWarning(true);
      return;
    }
    setRateWarning(false);
    sentTimestamps.current = timestamps;

    if (!customText) {
      setInput("");
    }
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setTyping(true);
    await new Promise(r => setTimeout(r, 1000 + Math.random() * 800));
    setTyping(false);
    setMessages(prev => [...prev, { role: "ai", text: getResponse(userMsg) }]);
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        id="ai-assistant-btn"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring" }}
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00ff88] to-[#00cc6a] flex items-center justify-center shadow-[0_0_30px_rgba(0,255,136,0.5)] hover:shadow-[0_0_50px_rgba(0,255,136,0.8)] transition-all hover:scale-110"
        aria-label="Open EcoBot Assistant"
        style={{ display: open ? "none" : "flex" }}
      >
        <Bot className="w-6 h-6 text-[#050a05]" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#00d4ff] rounded-full flex items-center justify-center">
          <Sparkles className="w-2.5 h-2.5 text-white" />
        </span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 rounded-2xl glass-dark border border-[rgba(0,255,136,0.2)] shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[rgba(0,255,136,0.1)] bg-[rgba(0,255,136,0.05)]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00ff88] to-[#00cc6a] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-[#050a05]" />
                </div>
                <div>
                  <div className="font-semibold text-sm">EcoBot Assistant</div>
                  <div className="flex items-center gap-1 text-xs text-[#00ff88]">
                    <span className="w-1.5 h-1.5 bg-[#00ff88] rounded-full animate-pulse" />
                    Online • Eco Guide
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setMinimized(!minimized)} aria-label={minimized ? "Expand chat" : "Minimize chat"} className="text-[#557755] hover:text-[#e8ffe8] transition-colors">
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button onClick={() => setOpen(false)} aria-label="Close chat" className="text-[#557755] hover:text-[#e8ffe8] transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!minimized && (
              <>
                {/* Messages */}
                <div className="h-72 overflow-y-auto p-4 space-y-3" role="log" aria-live="polite" aria-label="Chat conversation">
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      {msg.role === "ai" && (
                        <div className="w-7 h-7 rounded-lg bg-[rgba(0,255,136,0.15)] flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                          <Leaf className="w-3.5 h-3.5 text-[#00ff88]" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                          msg.role === "user"
                            ? "bg-[rgba(0,255,136,0.15)] text-[#e8ffe8] rounded-tr-sm border border-[rgba(0,255,136,0.2)]"
                            : "bg-[rgba(255,255,255,0.05)] text-[#88aa88] rounded-tl-sm border border-[rgba(255,255,255,0.05)]"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {typing && (
                    <div className="flex items-center gap-2" role="status" aria-label="EcoBot is typing">
                      <div className="w-7 h-7 rounded-lg bg-[rgba(0,255,136,0.15)] flex items-center justify-center">
                        <Leaf className="w-3.5 h-3.5 text-[#00ff88]" />
                      </div>
                      <div className="flex gap-1 bg-[rgba(255,255,255,0.05)] rounded-2xl px-4 py-3" aria-hidden="true">
                        {[0, 1, 2].map(i => (
                          <motion.div key={i} animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                            className="w-1.5 h-1.5 bg-[#00ff88] rounded-full" />
                        ))}
                      </div>
                      <span className="sr-only">EcoBot is typing…</span>
                    </div>
                  )}
                  <div ref={messagesEnd} />
                </div>

                {rateWarning && (
                  <div className="px-4 pb-1 text-xs text-[#f97316]" role="alert">
                    Whoa, slow down! Please wait a moment before sending more messages.
                  </div>
                )}

                {/* Quick replies */}
                <div className="px-4 pb-2 flex gap-2 overflow-x-auto no-scrollbar">
                  {["Eco tips 🌱", "My challenges ⚡", "Climate facts 🌍"].map(q => (
                    <button key={q} onClick={() => { sendMessage(q); }}
                      className="text-xs whitespace-nowrap px-3 py-1.5 rounded-full border border-[rgba(0,255,136,0.2)] text-[#557755] hover:text-[#00ff88] hover:border-[rgba(0,255,136,0.4)] transition-colors">
                      {q}
                    </button>
                  ))}
                </div>

                {/* Input */}
                <div className="p-4 pt-2 flex gap-2 border-t border-[rgba(0,255,136,0.08)]">
                  <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && sendMessage()}
                    placeholder="Ask EcoBot anything..."
                    className="eco-input text-xs py-2.5"
                    aria-label="Chat input"
                    maxLength={MAX_MESSAGE_LENGTH}
                  />
                  <button onClick={() => sendMessage()} aria-label="Send message"
                    className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00ff88] to-[#00cc6a] flex items-center justify-center flex-shrink-0 hover:shadow-[0_0_15px_rgba(0,255,136,0.5)] transition-all">
                    <Send className="w-4 h-4 text-[#050a05]" />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
