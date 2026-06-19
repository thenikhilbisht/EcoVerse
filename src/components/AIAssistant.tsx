"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, X, Minimize2, Leaf, Sparkles, AlertCircle } from "lucide-react";
import { getResponse, sanitizeMessage } from "./aiAssistantUtils";

type Message = { role: "user" | "ai"; text: string; id: number };

const quickReplies = ["Eco tips 🌱", "My challenges ⚡", "Climate facts 🌍", "Water saving 💧"];

/** Max messages per session window before rate-limiting kicks in */
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute

let msgIdCounter = 0;

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: msgIdCounter++,
      role: "ai",
      text: "Hi! I'm EcoBot 🌱 Your sustainability assistant. How can I help you reduce your carbon footprint today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [rateLimited, setRateLimited] = useState(false);

  // Rate-limiting: track timestamps of recent messages
  const msgTimestamps = useRef<number[]>([]);
  const messagesEnd = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const liveRegionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // Focus input when chat opens
  useEffect(() => {
    if (open && !minimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open, minimized]);

  // Announce new AI messages to screen readers via the live region
  const latestAiMessage = useMemo(
    () => [...messages].reverse().find((m) => m.role === "ai")?.text ?? "",
    [messages]
  );

  const isRateLimited = useCallback((): boolean => {
    const now = Date.now();
    // Remove timestamps outside the window
    msgTimestamps.current = msgTimestamps.current.filter(
      (t) => now - t < RATE_LIMIT_WINDOW_MS
    );
    return msgTimestamps.current.length >= RATE_LIMIT_MAX;
  }, []);

  const sendMessage = useCallback(
    async (customText?: string) => {
      const rawText = customText ?? input;
      const cleaned = sanitizeMessage(rawText);
      if (!cleaned) return;

      if (isRateLimited()) {
        setRateLimited(true);
        setTimeout(() => setRateLimited(false), 5000);
        return;
      }

      msgTimestamps.current.push(Date.now());

      if (!customText) setInput("");
      setMessages((prev) => [...prev, { id: msgIdCounter++, role: "user", text: cleaned }]);
      setTyping(true);

      await new Promise((resolve) => setTimeout(resolve, 700 + Math.random() * 500));

      setTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: msgIdCounter++, role: "ai", text: getResponse(cleaned) },
      ]);
    },
    [input, isRateLimited]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        void sendMessage();
      }
    },
    [sendMessage]
  );

  return (
    <>
      {/* Hidden live region for screen reader announcements */}
      <div
        ref={liveRegionRef}
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {latestAiMessage}
      </div>

      {/* Floating trigger button */}
      <motion.button
        id="ai-assistant-btn"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring" }}
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00ff88] to-[#00cc6a] flex items-center justify-center shadow-[0_0_30px_rgba(0,255,136,0.5)] hover:shadow-[0_0_50px_rgba(0,255,136,0.8)] transition-all hover:scale-110"
        aria-label="Open EcoBot sustainability assistant"
        aria-haspopup="dialog"
        style={{ display: open ? "none" : "flex" }}
      >
        <Bot className="w-6 h-6 text-[#050a05]" aria-hidden="true" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#00d4ff] rounded-full flex items-center justify-center" aria-hidden="true">
          <Sparkles className="w-2.5 h-2.5 text-white" />
        </span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="EcoBot sustainability assistant"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 rounded-2xl glass-dark border border-[rgba(0,255,136,0.2)] shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[rgba(0,255,136,0.1)] bg-[rgba(0,255,136,0.05)]">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00ff88] to-[#00cc6a] flex items-center justify-center"
                  aria-hidden="true"
                >
                  <Bot className="w-5 h-5 text-[#050a05]" />
                </div>
                <div>
                  <div className="font-semibold text-sm">EcoBot Assistant</div>
                  <div className="flex items-center gap-1 text-xs text-[#00ff88]">
                    <span className="w-1.5 h-1.5 bg-[#00ff88] rounded-full animate-pulse" aria-hidden="true" />
                    Online • Eco Expert
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setMinimized((prev) => !prev)}
                  className="text-[#557755] hover:text-[#e8ffe8] transition-colors p-1 rounded"
                  aria-label={minimized ? "Expand EcoBot chat" : "Minimize EcoBot chat"}
                >
                  <Minimize2 className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-[#557755] hover:text-[#e8ffe8] transition-colors p-1 rounded"
                  aria-label="Close EcoBot chat"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            {!minimized && (
              <>
                {/* Messages */}
                <div
                  className="h-72 overflow-y-auto p-4 space-y-3"
                  role="log"
                  aria-label="Chat messages"
                  aria-relevant="additions"
                >
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {msg.role === "ai" && (
                        <div
                          className="w-7 h-7 rounded-lg bg-[rgba(0,255,136,0.15)] flex items-center justify-center mr-2 flex-shrink-0 mt-1"
                          aria-hidden="true"
                        >
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

                  {/* Typing indicator */}
                  {typing && (
                    <div className="flex items-center gap-2" role="status" aria-label="EcoBot is typing">
                      <div
                        className="w-7 h-7 rounded-lg bg-[rgba(0,255,136,0.15)] flex items-center justify-center"
                        aria-hidden="true"
                      >
                        <Leaf className="w-3.5 h-3.5 text-[#00ff88]" />
                      </div>
                      <div className="flex gap-1 bg-[rgba(255,255,255,0.05)] rounded-2xl px-4 py-3" aria-hidden="true">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                            className="w-1.5 h-1.5 bg-[#00ff88] rounded-full"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Rate limit warning */}
                  {rateLimited && (
                    <div
                      role="alert"
                      className="flex items-center gap-2 p-3 rounded-xl bg-[rgba(255,165,0,0.1)] border border-[rgba(255,165,0,0.2)] text-xs text-[#ffd700]"
                    >
                      <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                      Please slow down — too many messages at once.
                    </div>
                  )}

                  <div ref={messagesEnd} />
                </div>

                {/* Quick replies */}
                <div className="px-4 pb-2 flex gap-2 overflow-x-auto no-scrollbar" aria-label="Quick response suggestions">
                  {quickReplies.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => void sendMessage(q)}
                      className="text-xs whitespace-nowrap px-3 py-1.5 rounded-full border border-[rgba(0,255,136,0.2)] text-[#557755] hover:text-[#00ff88] hover:border-[rgba(0,255,136,0.4)] transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>

                {/* Input */}
                <div className="p-4 pt-2 flex gap-2 border-t border-[rgba(0,255,136,0.08)]">
                  <label htmlFor="ecobot-input" className="sr-only">
                    Ask EcoBot anything about sustainability
                  </label>
                  <input
                    id="ecobot-input"
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value.slice(0, 280))}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask EcoBot anything..."
                    className="eco-input text-xs py-2.5"
                    autoComplete="off"
                    maxLength={280}
                    disabled={typing}
                    aria-describedby={rateLimited ? "rate-limit-warning" : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => void sendMessage()}
                    disabled={!input.trim() || typing}
                    className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00ff88] to-[#00cc6a] flex items-center justify-center flex-shrink-0 hover:shadow-[0_0_15px_rgba(0,255,136,0.5)] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    aria-label="Send message to EcoBot"
                  >
                    <Send className="w-4 h-4 text-[#050a05]" aria-hidden="true" />
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
