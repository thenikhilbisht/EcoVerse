"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Flame, Clock, Users, Filter, Search, CheckCircle, Zap, Lock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIAssistant from "@/components/AIAssistant";

const allChallenges = [
  { id: 1, emoji: "🚴", title: "Cycle to Work", category: "Transport", xp: 150, duration: "7 days", difficulty: "Easy", participants: 4820, desc: "Replace your car commute with cycling for a week.", color: "#00ff88", joined: true },
  { id: 2, emoji: "🥦", title: "Plant-Based Week", category: "Food", xp: 200, duration: "7 days", difficulty: "Medium", participants: 3210, desc: "Go fully plant-based for 7 days straight.", color: "#00d4ff", joined: true },
  { id: 3, emoji: "🌱", title: "Plant 5 Trees", category: "Nature", xp: 300, duration: "30 days", difficulty: "Hard", participants: 2150, desc: "Plant and document 5 trees in your community.", color: "#ffd700", joined: false },
  { id: 4, emoji: "♻️", title: "Zero Plastic Day", category: "Waste", xp: 100, duration: "1 day", difficulty: "Easy", participants: 9980, desc: "Spend 24 hours without using single-use plastics.", color: "#f97316", joined: false },
  { id: 5, emoji: "💡", title: "Energy Minimalist", category: "Energy", xp: 180, duration: "3 days", difficulty: "Medium", participants: 5340, desc: "Reduce electricity usage by 50% for 3 days.", color: "#a78bfa", joined: false },
  { id: 6, emoji: "🚿", title: "2-Min Shower", category: "Water", xp: 120, duration: "14 days", difficulty: "Easy", participants: 7660, desc: "Keep all showers under 2 minutes for 2 weeks.", color: "#60a5fa", joined: false },
  { id: 7, emoji: "🛒", title: "No New Purchases", category: "Shopping", xp: 250, duration: "7 days", difficulty: "Hard", participants: 1890, desc: "Buy nothing new for 7 days. Borrow, swap, or go without.", color: "#f97316", joined: false },
  { id: 8, emoji: "🌞", title: "Solar Challenge", category: "Energy", xp: 400, duration: "30 days", difficulty: "Hard", participants: 980, desc: "Document your solar energy savings for a month.", color: "#ffd700", joined: false },
  { id: 9, emoji: "🚌", title: "Public Transport Only", category: "Transport", xp: 160, duration: "5 days", difficulty: "Medium", participants: 4100, desc: "Use only public transport for 5 days.", color: "#00ff88", joined: false },
  { id: 10, emoji: "🍃", title: "Grow Your Food", category: "Food", xp: 280, duration: "30 days", difficulty: "Hard", participants: 1540, desc: "Grow at least one type of food at home.", color: "#00d4ff", joined: false },
  { id: 11, emoji: "💧", title: "Rainwater Harvesting", category: "Water", xp: 220, duration: "14 days", difficulty: "Medium", participants: 2340, desc: "Set up and use a rainwater collection system.", color: "#60a5fa", joined: false },
  { id: 12, emoji: "📱", title: "Digital Detox", category: "Digital", xp: 130, duration: "3 days", difficulty: "Medium", participants: 6780, desc: "Reduce screen time by 50% for 3 days.", color: "#a78bfa", joined: false },
];

const categories = ["All", "Transport", "Food", "Energy", "Water", "Nature", "Waste", "Shopping", "Digital"];
const difficulties = ["All", "Easy", "Medium", "Hard"];
const difficultyColors: Record<string, string> = { Easy: "#00ff88", Medium: "#ffd700", Hard: "#f97316" };

export default function ChallengesPage() {
  const [selectedCat, setSelectedCat] = useState("All");
  const [selectedDiff, setSelectedDiff] = useState("All");
  const [search, setSearch] = useState("");
  const [joinedIds, setJoinedIds] = useState<number[]>([1, 2]);

  const filtered = allChallenges.filter(c => {
    const matchCat = selectedCat === "All" || c.category === selectedCat;
    const matchDiff = selectedDiff === "All" || c.difficulty === selectedDiff;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchDiff && matchSearch;
  });

  const toggleJoin = (id: number) => {
    setJoinedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <main className="min-h-screen bg-eco-black">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <span className="badge-green mb-3 inline-block">⚡ Eco Challenges</span>
          <h1 className="section-title mb-3">Choose Your <span className="text-gradient">Mission</span></h1>
          <p className="section-subtitle">Complete challenges, earn XP, and reduce your carbon footprint. Every action counts.</p>
        </motion.div>

        {/* Active challenges banner */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 border border-[rgba(0,255,136,0.2)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[rgba(255,215,0,0.15)] flex items-center justify-center">
              <Flame className="w-5 h-5 text-[#ffd700]" />
            </div>
            <div>
              <div className="font-semibold text-sm">You have {joinedIds.length} active challenges</div>
              <div className="text-[#557755] text-xs">Keep your streak going! 🔥 22 days</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {joinedIds.map(id => {
              const c = allChallenges.find(ch => ch.id === id);
              return c ? <span key={id} className="text-xl" title={c.title}>{c.emoji}</span> : null;
            })}
          </div>
        </motion.div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#557755]" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search challenges..."
              className="eco-input pl-9" aria-label="Search challenges" />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#557755]" />
            <select value={selectedDiff} onChange={e => setSelectedDiff(e.target.value)} className="eco-input py-2.5 w-auto"
              aria-label="Filter by difficulty">
              {difficulties.map(d => <option key={d} value={d} className="bg-[#0d1a0d]">{d}</option>)}
            </select>
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8">
          {categories.map(cat => (
            <button key={cat} onClick={() => setSelectedCat(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                selectedCat === cat ? "tab-active" : "tab-inactive border border-[rgba(255,255,255,0.08)] text-[#88aa88]"
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="text-[#557755] text-sm mb-5">{filtered.length} challenges found</div>

        {/* Challenge Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((c, i) => {
            const isJoined = joinedIds.includes(c.id);
            return (
              <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="glass-card rounded-2xl p-5 challenge-card group">
                {/* Top */}
                <div className="flex justify-between items-start mb-3">
                  <div className="text-3xl">{c.emoji}</div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs font-semibold flex items-center gap-1 text-[#ffd700]">
                      <Flame className="w-3 h-3" /> {c.xp} XP
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded font-medium"
                      style={{ color: difficultyColors[c.difficulty], background: `${difficultyColors[c.difficulty]}15` }}>
                      {c.difficulty}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-semibold text-sm mb-1">{c.title}</h3>
                <p className="text-[#557755] text-xs mb-3 leading-relaxed">{c.desc}</p>

                {/* Meta */}
                <div className="flex items-center gap-3 text-xs text-[#557755] mb-4">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{c.duration}</span>
                  <span className="flex items-center gap-1"><Users className="w-3 h-3" />{c.participants.toLocaleString()}</span>
                </div>

                {/* Action */}
                <button onClick={() => toggleJoin(c.id)}
                  id={`challenge-${c.id}-btn`}
                  className={`w-full py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                    isJoined
                      ? "bg-[rgba(0,255,136,0.15)] text-[#00ff88] border border-[rgba(0,255,136,0.3)]"
                      : "bg-transparent border text-[#88aa88] hover:text-[#00ff88] hover:border-[rgba(0,255,136,0.3)]"
                  }`}
                  style={{ borderColor: isJoined ? undefined : `${c.color}30` }}>
                  {isJoined
                    ? <><CheckCircle className="w-3.5 h-3.5" /> Joined!</>
                    : <><Zap className="w-3.5 h-3.5" /> Join Challenge</>
                  }
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Weekly featured challenge */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mt-10 glass-card rounded-2xl p-6 md:p-8 border border-[rgba(255,215,0,0.2)]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="text-5xl">🌍</div>
              <div>
                <div className="badge-gold mb-2 inline-block">🏆 Weekly Global Challenge</div>
                <h3 className="font-display text-xl font-bold mb-1">Earth Week Marathon</h3>
                <p className="text-[#557755] text-sm max-w-md">Complete all 7 daily challenges this week. Top 100 earn exclusive NFT badges and 5,000 XP bonus.</p>
                <div className="flex items-center gap-4 mt-3 text-xs text-[#557755]">
                  <span className="flex items-center gap-1"><Flame className="w-3.5 h-3.5 text-[#ffd700]" />5,000 XP reward</span>
                  <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />32,450 joined</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />3 days left</span>
                </div>
              </div>
            </div>
            <button className="btn-primary flex items-center gap-2 whitespace-nowrap">
              <Zap className="w-4 h-4" /> Join Now
            </button>
          </div>
        </motion.div>
      </div>

      <Footer />
      <AIAssistant />
    </main>
  );
}
