"use client";

import { motion } from "framer-motion";
import { Lightbulb, Trophy, Users, ExternalLink, Rocket, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIAssistant from "@/components/AIAssistant";

const ideas = [
  { title: "Solar-Powered EV Charging Grid", author: "Arjun Sharma", country: "🇮🇳", category: "Energy", votes: 284, status: "Trending 🔥", desc: "P2P solar energy sharing network for EV charging in residential areas.", emoji: "⚡" },
  { title: "AI Waste Sorter for Apartments", author: "Lena Fischer", country: "🇩🇪", category: "Waste", votes: 196, status: "Funded 💰", desc: "Smart bin using computer vision to automatically sort recyclables.", emoji: "♻️" },
  { title: "Carbon Credit NFTs", author: "Emma Wilson", country: "🇬🇧", category: "Finance", votes: 168, status: "In Review", desc: "Blockchain-based carbon credits for individuals and small businesses.", emoji: "🪙" },
  { title: "Vertical Farming Kits", author: "Yuki Tanaka", country: "🇯🇵", category: "Food", votes: 145, status: "MVP Ready", desc: "Affordable modular indoor farming kits for urban apartments.", emoji: "🌿" },
  { title: "Ocean Plastic Drone Network", author: "Carlos Reyes", country: "🇲🇽", category: "Ocean", votes: 132, status: "Trending 🔥", desc: "Autonomous drone swarm for collecting microplastics from coastal waters.", emoji: "🌊" },
  { title: "Green Delivery Routing AI", author: "Priya Nair", country: "🇮🇳", category: "Transport", votes: 118, status: "In Review", desc: "AI that optimizes last-mile delivery routes for minimum carbon footprint.", emoji: "🚚" },
];

const mentors = [
  { name: "Dr. Sarah Chen", role: "Climate Scientist, MIT", expertise: "Carbon Markets", avatar: "SC" },
  { name: "James Patel", role: "VC at GreenTech Fund", expertise: "CleanTech Funding", avatar: "JP" },
  { name: "Maria Santos", role: "CEO, EcoStartup", expertise: "Sustainable Business", avatar: "MS" },
];

export default function InnovationPage() {
  return (
    <main className="min-h-screen bg-eco-black">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <span className="badge-blue mb-3 inline-block">🚀 Innovation Hub</span>
          <h1 className="section-title mb-3">Build the <span className="text-gradient">Green Future</span></h1>
          <p className="section-subtitle mx-auto">Submit climate-tech ideas, compete for funding, and connect with mentors and investors.</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Ideas Submitted", value: "1,240", color: "#00ff88", emoji: "💡" },
            { label: "Total Funding", value: "$2.4M", color: "#ffd700", emoji: "💰" },
            { label: "Mentors", value: "89", color: "#00d4ff", emoji: "🎓" },
            { label: "Universities", value: "156", color: "#a78bfa", emoji: "🏛️" },
          ].map(s => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="stat-card text-center">
              <div className="text-2xl mb-1">{s.emoji}</div>
              <div className="text-2xl font-display font-bold" style={{ color: s.color }}>{s.value}</div>
              <div className="text-[#557755] text-xs">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Submit Banner */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="glass-card rounded-2xl p-6 md:p-8 mb-10 border border-[rgba(0,255,136,0.2)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-xl font-bold mb-2">🌱 Got a Green Idea?</h2>
            <p className="text-[#557755] text-sm max-w-lg">Submit your climate-tech startup idea and compete for up to $50,000 in funding, mentorship, and incubation support from top VCs.</p>
          </div>
          <button className="btn-primary flex items-center gap-2 whitespace-nowrap">
            <Rocket className="w-4 h-4" /> Submit Your Idea
          </button>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Ideas */}
          <div className="lg:col-span-2">
            <h2 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-[#ffd700]" /> Top Climate-Tech Ideas
            </h2>
            <div className="space-y-4">
              {ideas.map((idea, i) => (
                <motion.div key={idea.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  className="glass-card rounded-2xl p-5 hover:border-[rgba(0,255,136,0.2)] transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{idea.emoji}</span>
                      <div>
                        <h3 className="font-semibold text-sm mb-1">{idea.title}</h3>
                        <p className="text-[#557755] text-xs leading-relaxed">{idea.desc}</p>
                      </div>
                    </div>
                    <div className="text-xs px-2 py-1 rounded-lg whitespace-nowrap ml-3"
                      style={{ background: idea.status.includes("Funded") ? "rgba(255,215,0,0.15)" : "rgba(0,255,136,0.1)",
                        color: idea.status.includes("Funded") ? "#ffd700" : "#00ff88",
                        border: `1px solid ${idea.status.includes("Funded") ? "rgba(255,215,0,0.3)" : "rgba(0,255,136,0.2)"}` }}>
                      {idea.status}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-[#557755]">
                      <span>{idea.author} {idea.country}</span>
                      <span className="badge-blue">{idea.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="flex items-center gap-1 text-xs text-[#557755] hover:text-[#00ff88] transition-colors">
                        <Star className="w-3.5 h-3.5" /> {idea.votes} votes
                      </button>
                      <button className="btn-ghost py-1.5 px-3 text-xs flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" /> View
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Mentors */}
            <div className="glass-card rounded-2xl p-5">
              <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
                <Users className="w-4 h-4 text-[#00ff88]" /> Featured Mentors
              </h3>
              {mentors.map(m => (
                <div key={m.name} className="flex items-center gap-3 py-3 border-b border-[rgba(255,255,255,0.04)]">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00ff88] to-[#00cc6a] flex items-center justify-center text-xs font-bold text-[#050a05]">
                    {m.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{m.name}</div>
                    <div className="text-[#557755] text-xs">{m.role}</div>
                    <div className="badge-blue mt-1 text-[10px]">{m.expertise}</div>
                  </div>
                </div>
              ))}
              <button className="btn-ghost w-full mt-3 text-sm">View All Mentors →</button>
            </div>

            {/* Competition */}
            <div className="glass-card rounded-2xl p-5 border border-[rgba(255,215,0,0.2)]">
              <div className="badge-gold mb-2 inline-block">🏆 Current Competition</div>
              <h3 className="font-semibold text-sm mb-2">Climate-Tech Hackathon 2026</h3>
              <div className="space-y-1.5 text-xs text-[#557755] mb-4">
                <div>💰 Prize: $50,000 + Incubation</div>
                <div>📅 Deadline: July 15, 2026</div>
                <div>🏛️ 156 Universities participating</div>
              </div>
              <button className="btn-primary w-full py-2 text-sm">Apply Now</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <AIAssistant />
    </main>
  );
}
