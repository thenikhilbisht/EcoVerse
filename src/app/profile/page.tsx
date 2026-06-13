"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Edit2, Flame, Star, TreePine, TrendingDown, Trophy, Shield, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIAssistant from "@/components/AIAssistant";

const badges = [
  { emoji: "🌱", title: "First Step", desc: "First challenge completed", earned: true },
  { emoji: "🔥", title: "7-Day Streak", desc: "7 days consecutive", earned: true },
  { emoji: "🚴", title: "Cycle Master", desc: "50km cycled total", earned: true },
  { emoji: "♻️", title: "Zero Plastic Hero", desc: "10 plastic-free days", earned: true },
  { emoji: "🌳", title: "Tree Planter", desc: "5 trees planted", earned: false },
  { emoji: "⚡", title: "Energy Saver", desc: "100 kWh saved", earned: false },
  { emoji: "🏆", title: "Top 100", desc: "Reached global top 100", earned: false },
  { emoji: "💧", title: "Water Guardian", desc: "1000L water saved", earned: false },
];

export default function ProfilePage() {
  const [editMode, setEditMode] = useState(false);

  return (
    <main className="min-h-screen bg-eco-black">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        {/* Profile Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-6 md:p-8 mb-6 relative">
          <button onClick={() => setEditMode(!editMode)}
            className="absolute top-5 right-5 btn-ghost text-xs flex items-center gap-1.5">
            <Edit2 className="w-3.5 h-3.5" /> {editMode ? "Save" : "Edit Profile"}
          </button>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#00ff88] to-[#00cc6a] flex items-center justify-center text-3xl font-bold text-[#050a05] shadow-[0_0_30px_rgba(0,255,136,0.4)]">
                EW
              </div>
              <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-lg bg-[#ffd700] flex items-center justify-center">
                <span className="text-xs font-bold text-[#050a05]">12</span>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              {editMode ? (
                <input defaultValue="Eco Warrior" className="eco-input text-xl font-bold mb-2 w-auto" />
              ) : (
                <h1 className="text-2xl font-display font-bold mb-1">Eco Warrior</h1>
              )}
              <div className="badge-green mb-3">Level 12 • Climate Hero</div>
              <p className="text-[#557755] text-sm mb-4 max-w-md">
                Passionate about sustainability and proving that individual action creates collective impact. 🌍
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                {[
                  { icon: Flame, label: "22 day streak", color: "#ffd700" },
                  { icon: Trophy, label: "Global #248", color: "#00ff88" },
                  { icon: Star, label: "2,450 XP", color: "#00d4ff" },
                ].map(b => (
                  <div key={b.label} className="flex items-center gap-1.5 text-xs" style={{ color: b.color }}>
                    <b.icon className="w-3.5 h-3.5" /> {b.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { icon: TrendingDown, label: "CO₂ Saved", value: "284 kg", color: "#00ff88" },
            { icon: TreePine, label: "Trees Equiv.", value: "14", color: "#00d4ff" },
            { icon: Shield, label: "Challenges", value: "18 done", color: "#ffd700" },
            { icon: Zap, label: "Eco Coins", value: "2,450 🪙", color: "#a78bfa" },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="stat-card text-center">
              <s.icon className="w-6 h-6 mx-auto mb-2" style={{ color: s.color }} />
              <div className="text-xl font-display font-bold" style={{ color: s.color }}>{s.value}</div>
              <div className="text-[#557755] text-xs mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* XP Progress */}
        <div className="glass-card rounded-2xl p-5 mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-display font-semibold">Level Progress</h2>
            <span className="badge-green">Level 12 → 13</span>
          </div>
          <div className="progress-bar h-3 mb-2">
            <div className="progress-fill" style={{ width: "72%" }} />
          </div>
          <div className="flex justify-between text-xs text-[#557755]">
            <span>2,450 XP</span>
            <span>550 XP to Level 13</span>
            <span>3,000 XP</span>
          </div>
        </div>

        {/* Badges */}
        <div className="glass-card rounded-2xl p-5">
          <h2 className="font-display font-semibold mb-4 flex items-center gap-2">
            <Star className="w-4 h-4 text-[#ffd700]" /> Achievement Badges
          </h2>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
            {badges.map((b, i) => (
              <motion.div key={b.title} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                title={`${b.title}: ${b.desc}`}
                className={`flex flex-col items-center gap-1 p-3 rounded-xl cursor-pointer transition-all hover:scale-110 ${
                  b.earned
                    ? "bg-[rgba(0,255,136,0.1)] border border-[rgba(0,255,136,0.2)]"
                    : "bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] grayscale opacity-50"
                }`}>
                <span className="text-2xl">{b.emoji}</span>
                <span className="text-[10px] text-[#557755] text-center leading-tight">{b.title}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
      <AIAssistant />
    </main>
  );
}
