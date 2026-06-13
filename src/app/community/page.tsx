"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2, Plus, Search, TrendingUp, Users, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIAssistant from "@/components/AIAssistant";

const posts = [
  { id: 1, author: "Arjun Sharma", country: "🇮🇳", avatar: "AS", level: "Carbon Master", time: "2h ago", content: "Just completed my 142-day streak! 🔥 Cycling to work every single day. The key is to start small and build momentum. Who's joining me for the next challenge?", likes: 284, comments: 42, tags: ["cycling", "streak"], emoji: "🚴" },
  { id: 2, author: "Emma Wilson", country: "🇬🇧", avatar: "EW", level: "Earth Guardian", time: "5h ago", content: "Plant-based week complete! 🥦 Day 7 down. I was skeptical at first but honestly it wasn't as hard as I thought. My carbon score dropped by 18% this week alone!", likes: 196, comments: 28, tags: ["plantbased", "food"], emoji: "🥦" },
  { id: 3, author: "Lena Fischer", country: "🇩🇪", avatar: "LF", level: "Earth Guardian", time: "1d ago", content: "Planted tree #19 today! 🌱 Each one planted near the local school. Kids are fascinated and asking so many questions about climate. The next generation gets it!", likes: 321, comments: 56, tags: ["trees", "nature"], emoji: "🌱" },
  { id: 4, author: "Yuki Tanaka", country: "🇯🇵", avatar: "YT", level: "Climate Hero", time: "2d ago", content: "Set up rainwater collection at home ☔ First batch used to water the garden. Cut water usage by 40% this month. Simple solution, huge impact!", likes: 178, comments: 23, tags: ["water", "DIY"], emoji: "💧" },
];

const teams = [
  { name: "Green Pioneers", members: 48, co2: 1240, emoji: "🌿", country: "🇮🇳" },
  { name: "Zero Carbon Squad", members: 32, co2: 890, emoji: "⚡", country: "🇩🇪" },
  { name: "Climate Fighters", members: 65, co2: 1680, emoji: "🔥", country: "🌍" },
  { name: "Eco Innovators", members: 28, co2: 720, emoji: "🚀", country: "🇯🇵" },
];

export default function CommunityPage() {
  const [liked, setLiked] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<"feed" | "teams">("feed");

  return (
    <main className="min-h-screen bg-eco-black">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <span className="badge-blue mb-3 inline-block">🌍 Community</span>
          <h1 className="section-title mb-3">Warriors <span className="text-gradient">United</span></h1>
          <p className="section-subtitle">Share your journey, inspire others, and build a greener world together.</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Feed */}
          <div className="lg:col-span-2">
            {/* Post input */}
            <div className="glass-card rounded-2xl p-5 mb-5">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00ff88] to-[#00cc6a] flex items-center justify-center text-xs font-bold text-[#050a05] flex-shrink-0">
                  ME
                </div>
                <div className="flex-1">
                  <textarea placeholder="Share your eco achievement, tip, or challenge..." rows={2}
                    className="eco-input resize-none text-sm" aria-label="Post content" />
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex gap-2">
                      {["🌱", "🚴", "♻️", "💧", "🌳"].map(e => (
                        <button key={e} className="text-lg hover:scale-125 transition-transform">{e}</button>
                      ))}
                    </div>
                    <button className="btn-primary py-2 px-4 text-sm flex items-center gap-2">
                      <Plus className="w-4 h-4" /> Post
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-5">
              {(["feed", "teams"] as const).map(t => (
                <button key={t} onClick={() => setActiveTab(t)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${t === activeTab ? "tab-active" : "tab-inactive border border-[rgba(255,255,255,0.08)] text-[#88aa88]"}`}>
                  {t === "feed" ? "📢 Community Feed" : "👥 Teams"}
                </button>
              ))}
            </div>

            {activeTab === "feed" && (
              <div className="space-y-4">
                {posts.map((p, i) => (
                  <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                    className="glass-card rounded-2xl p-5">
                    {/* Author */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00ff88] to-[#00cc6a] flex items-center justify-center text-xs font-bold text-[#050a05]">
                          {p.avatar}
                        </div>
                        <div>
                          <div className="font-semibold text-sm">{p.author} {p.country}</div>
                          <div className="flex items-center gap-2 text-xs">
                            <span className="text-[#00ff88]">{p.level}</span>
                            <span className="text-[#557755]">• {p.time}</span>
                          </div>
                        </div>
                      </div>
                      <span className="text-2xl">{p.emoji}</span>
                    </div>

                    {/* Content */}
                    <p className="text-[#88aa88] text-sm leading-relaxed mb-4">{p.content}</p>

                    {/* Tags */}
                    <div className="flex gap-2 mb-4 flex-wrap">
                      {p.tags.map(tag => (
                        <span key={tag} className="badge-green text-[10px]">#{tag}</span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4 border-t border-[rgba(255,255,255,0.05)] pt-3">
                      <button onClick={() => setLiked(prev => prev.includes(p.id) ? prev.filter(i => i !== p.id) : [...prev, p.id])}
                        className={`flex items-center gap-1.5 text-xs transition-colors ${liked.includes(p.id) ? "text-[#f97316]" : "text-[#557755] hover:text-[#f97316]"}`}
                        aria-label="Like post">
                        <Heart className={`w-4 h-4 ${liked.includes(p.id) ? "fill-[#f97316]" : ""}`} />
                        {p.likes + (liked.includes(p.id) ? 1 : 0)}
                      </button>
                      <button className="flex items-center gap-1.5 text-xs text-[#557755] hover:text-[#00d4ff] transition-colors">
                        <MessageCircle className="w-4 h-4" /> {p.comments}
                      </button>
                      <button className="flex items-center gap-1.5 text-xs text-[#557755] hover:text-[#00ff88] transition-colors ml-auto">
                        <Share2 className="w-4 h-4" /> Share
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === "teams" && (
              <div className="grid sm:grid-cols-2 gap-4">
                {teams.map((t, i) => (
                  <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                    className="glass-card rounded-2xl p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">{t.emoji}</span>
                      <div>
                        <div className="font-semibold text-sm">{t.name}</div>
                        <div className="text-[#557755] text-xs">{t.country} • {t.members} members</div>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm mb-4">
                      <div><div className="font-bold text-[#00ff88]">{t.co2} kg</div><div className="text-[#557755] text-xs">CO₂ saved</div></div>
                      <div className="text-right"><div className="font-bold text-[#00d4ff]">#{i + 1}</div><div className="text-[#557755] text-xs">Team rank</div></div>
                    </div>
                    <button className="btn-secondary w-full py-2 text-sm">Join Team</button>
                  </motion.div>
                ))}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                  className="glass-card rounded-2xl p-5 flex flex-col items-center justify-center gap-3 border border-dashed border-[rgba(0,255,136,0.3)] cursor-pointer hover:bg-[rgba(0,255,136,0.05)] transition-colors">
                  <Plus className="w-8 h-8 text-[#00ff88]" />
                  <div className="text-sm font-medium text-[#00ff88]">Create New Team</div>
                  <div className="text-[#557755] text-xs text-center">Start a team and invite friends to compete together</div>
                </motion.div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Trending */}
            <div className="glass-card rounded-2xl p-5">
              <h3 className="font-display font-semibold mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#00ff88]" /> Trending Topics
              </h3>
              {["#PlantBasedWeek", "#ZeroWaste", "#CycleChallenge", "#TreePlanting", "#SolarPower"].map((tag, i) => (
                <div key={tag} className="flex justify-between items-center py-2 border-b border-[rgba(255,255,255,0.04)]">
                  <span className="text-[#00ff88] text-sm hover:underline cursor-pointer">{tag}</span>
                  <span className="text-[#557755] text-xs">{(500 - i * 80).toLocaleString()} posts</span>
                </div>
              ))}
            </div>

            {/* Active members */}
            <div className="glass-card rounded-2xl p-5">
              <h3 className="font-display font-semibold mb-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-[#00ff88]" /> Active Now
              </h3>
              <div className="flex flex-wrap gap-2">
                {["AS", "EW", "LF", "YT", "CR", "PN", "JO", "SM"].map(a => (
                  <div key={a} className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00ff88] to-[#00cc6a] flex items-center justify-center text-xs font-bold text-[#050a05] cursor-pointer hover:scale-110 transition-transform">
                    {a}
                  </div>
                ))}
              </div>
              <div className="text-[#557755] text-xs mt-3">+2,840 more warriors online</div>
            </div>

            {/* Weekly challenge */}
            <div className="glass-card rounded-2xl p-5 border border-[rgba(255,215,0,0.2)]">
              <div className="badge-gold mb-2 inline-block">🏆 This Week</div>
              <h3 className="font-semibold text-sm mb-2">Earth Week Marathon</h3>
              <p className="text-[#557755] text-xs mb-3">Join 32,450+ warriors for the biggest eco challenge of the year.</p>
              <button className="btn-primary w-full py-2 text-sm">Join Challenge</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <AIAssistant />
    </main>
  );
}
