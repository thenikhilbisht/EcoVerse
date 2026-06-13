"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Crown, Flame, Search, Globe, Users, Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIAssistant from "@/components/AIAssistant";

const users = [
  { rank: 1, name: "Arjun Sharma", country: "🇮🇳", xp: 48520, co2: 3.2, level: "Carbon Master", avatar: "AS", streak: 142, challenges: 87, trees: 28 },
  { rank: 2, name: "Emma Wilson", country: "🇬🇧", xp: 45100, co2: 2.8, level: "Earth Guardian", avatar: "EW", streak: 98, challenges: 74, trees: 22 },
  { rank: 3, name: "Lena Fischer", country: "🇩🇪", xp: 41890, co2: 3.5, level: "Earth Guardian", avatar: "LF", streak: 87, challenges: 69, trees: 19 },
  { rank: 4, name: "Yuki Tanaka", country: "🇯🇵", xp: 38760, co2: 2.1, level: "Climate Hero", avatar: "YT", streak: 76, challenges: 63, trees: 17 },
  { rank: 5, name: "Carlos Reyes", country: "🇲🇽", xp: 35420, co2: 3.8, level: "Climate Hero", avatar: "CR", streak: 65, challenges: 58, trees: 15 },
  { rank: 6, name: "Priya Nair", country: "🇮🇳", xp: 32100, co2: 2.9, level: "Eco Warrior", avatar: "PN", streak: 54, challenges: 52, trees: 13 },
  { rank: 7, name: "James O'Brien", country: "🇺🇸", xp: 28950, co2: 4.2, level: "Eco Warrior", avatar: "JO", streak: 43, challenges: 45, trees: 11 },
  { rank: 8, name: "Sofia Martinez", country: "🇪🇸", xp: 25680, co2: 3.1, level: "Eco Warrior", avatar: "SM", streak: 38, challenges: 41, trees: 9 },
  { rank: 9, name: "Chen Wei", country: "🇨🇳", xp: 22400, co2: 3.6, level: "Eco Warrior", avatar: "CW", streak: 32, challenges: 36, trees: 8 },
  { rank: 10, name: "Amara Osei", country: "🇬🇭", xp: 19800, co2: 2.4, level: "Green Beginner", avatar: "AO", streak: 28, challenges: 31, trees: 7 },
];

const countryLeaders = [
  { country: "🇮🇳 India", members: 18420, co2: 120.4, rank: 1 },
  { country: "🇩🇪 Germany", members: 14200, co2: 98.2, rank: 2 },
  { country: "🇯🇵 Japan", members: 12800, co2: 87.6, rank: 3 },
  { country: "🇬🇧 UK", members: 11900, co2: 82.1, rank: 4 },
  { country: "🇺🇸 USA", members: 10500, co2: 74.3, rank: 5 },
];

const rankColors: Record<number, string> = { 1: "#ffd700", 2: "#c0c0c0", 3: "#cd7f32" };

export default function LeaderboardPage() {
  const [tab, setTab] = useState<"global" | "country" | "weekly">("global");
  const [search, setSearch] = useState("");

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-eco-black">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
          <span className="badge-gold mb-3 inline-block">🏆 Global Rankings</span>
          <h1 className="section-title mb-3">Who&apos;s Saving the <span className="text-gradient">Planet Most?</span></h1>
          <p className="section-subtitle mx-auto">Compete globally, rise through ranks, and earn your place as a Carbon Master.</p>
        </motion.div>

        {/* Top 3 Podium */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-8 mb-8">
          <div className="flex justify-center items-end gap-4 md:gap-8">
            {[users[1], users[0], users[2]].map((u, i) => {
              const isFirst = i === 1;
              return (
                <motion.div key={u.rank} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex flex-col items-center gap-2">
                  {isFirst && <Crown className="w-6 h-6 text-[#ffd700] mb-1" />}
                  <div className={`rounded-full flex items-center justify-center font-bold text-sm md:text-lg ${isFirst ? "w-20 h-20 md:w-24 md:h-24" : "w-14 h-14 md:w-18 md:h-18"}`}
                    style={{ background: `${rankColors[u.rank]}20`, border: `3px solid ${rankColors[u.rank]}`, color: rankColors[u.rank] }}>
                    {u.avatar}
                  </div>
                  <div className={`text-center ${isFirst ? "mb-0" : "mt-4"}`}>
                    <div className="font-semibold text-sm">{u.name.split(" ")[0]}</div>
                    <div className="text-[#557755] text-xs">{u.country}</div>
                    <div className="font-mono text-xs font-bold mt-1" style={{ color: rankColors[u.rank] }}>
                      {(u.xp / 1000).toFixed(1)}k XP
                    </div>
                  </div>
                  <div className={`text-center text-xs font-bold rounded-lg px-3 py-1`}
                    style={{ background: `${rankColors[u.rank]}20`, color: rankColors[u.rank] }}>
                    #{u.rank}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main table */}
          <div className="lg:col-span-2">
            {/* Tabs + Search */}
            <div className="flex flex-col sm:flex-row gap-4 mb-5">
              <div className="flex gap-2">
                {(["global", "country", "weekly"] as const).map(t => (
                  <button key={t} onClick={() => setTab(t)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${tab === t ? "tab-active" : "tab-inactive border border-[rgba(255,255,255,0.08)] text-[#88aa88]"}`}>
                    {t}
                  </button>
                ))}
              </div>
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#557755]" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search warriors..."
                  className="eco-input pl-9 py-2.5" aria-label="Search leaderboard" />
              </div>
            </div>

            {tab === "global" && (
              <div className="glass-card rounded-2xl overflow-hidden">
                <div className="grid grid-cols-12 gap-2 px-5 py-3 border-b border-[rgba(0,255,136,0.08)] text-xs text-[#557755] font-medium">
                  <span className="col-span-1">#</span>
                  <span className="col-span-4">Warrior</span>
                  <span className="col-span-2 text-right">XP</span>
                  <span className="col-span-2 text-right">CO₂ t/yr</span>
                  <span className="col-span-2 text-right">Streak</span>
                  <span className="col-span-1" />
                </div>
                {filtered.map((u, i) => (
                  <motion.div key={u.rank} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                    className="grid grid-cols-12 gap-2 items-center px-5 py-3.5 border-b border-[rgba(0,255,136,0.04)] hover:bg-[rgba(0,255,136,0.04)] transition-colors">
                    <span className="col-span-1 text-sm font-bold" style={{ color: rankColors[u.rank] || "#557755" }}>
                      {u.rank <= 3 ? ["🥇", "🥈", "🥉"][u.rank - 1] : `#${u.rank}`}
                    </span>
                    <div className="col-span-4 flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                        style={{ background: "rgba(0,255,136,0.1)", border: "1px solid rgba(0,255,136,0.2)", color: "#00ff88" }}>
                        {u.avatar}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-medium truncate">{u.name} {u.country}</div>
                        <div className="text-[#557755] text-xs truncate">{u.level}</div>
                      </div>
                    </div>
                    <div className="col-span-2 text-right text-sm font-mono text-[#00ff88]">{(u.xp / 1000).toFixed(1)}k</div>
                    <div className="col-span-2 text-right text-sm font-mono text-[#00d4ff]">{u.co2}</div>
                    <div className="col-span-2 text-right text-sm flex items-center justify-end gap-1 text-[#ffd700]">
                      <Flame className="w-3.5 h-3.5" />{u.streak}d
                    </div>
                    <div className="col-span-1 flex justify-end">
                      <div className="w-6 h-6 rounded-full bg-[rgba(0,255,136,0.1)] flex items-center justify-center cursor-pointer hover:bg-[rgba(0,255,136,0.2)] transition-colors">
                        <Users className="w-3 h-3 text-[#557755]" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {tab === "country" && (
              <div className="glass-card rounded-2xl overflow-hidden">
                {countryLeaders.map((c, i) => (
                  <div key={c.country} className="flex items-center gap-4 px-5 py-4 border-b border-[rgba(0,255,136,0.04)] hover:bg-[rgba(0,255,136,0.04)] transition-colors">
                    <span className="text-2xl font-bold w-8" style={{ color: rankColors[c.rank] || "#557755" }}>
                      {c.rank <= 3 ? ["🥇", "🥈", "🥉"][c.rank - 1] : `#${c.rank}`}
                    </span>
                    <Globe className="w-5 h-5 text-[#557755]" />
                    <div className="flex-1">
                      <div className="font-medium text-sm">{c.country}</div>
                      <div className="text-[#557755] text-xs">{c.members.toLocaleString()} members</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-[#00ff88]">{c.co2}t</div>
                      <div className="text-[#557755] text-xs">CO₂ saved</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === "weekly" && (
              <div className="glass-card rounded-2xl p-6 text-center">
                <div className="text-4xl mb-3">🏆</div>
                <h3 className="font-display font-bold text-lg mb-2">Weekly Challenge Active</h3>
                <p className="text-[#557755] text-sm mb-4">Rankings reset every Sunday. Current week: Earth Week Marathon</p>
                <div className="badge-gold inline-block">Ends in 3 days 14 hours</div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Your rank */}
            <div className="glass-card rounded-2xl p-5">
              <h3 className="font-display font-semibold mb-4">Your Standing</h3>
              <div className="text-center py-3">
                <div className="text-5xl font-display font-bold text-gradient mb-1">#248</div>
                <div className="text-[#557755] text-sm mb-1">Global Rank</div>
                <div className="badge-green mb-4">Eco Warrior</div>
                <div className="space-y-2">
                  {[
                    { label: "XP Points", value: "2,450", color: "#00ff88" },
                    { label: "CO₂ Saved", value: "284 kg", color: "#00d4ff" },
                    { label: "Challenges", value: "18 done", color: "#ffd700" },
                    { label: "Streak", value: "22 days 🔥", color: "#f97316" },
                  ].map(s => (
                    <div key={s.label} className="flex justify-between text-sm">
                      <span className="text-[#557755]">{s.label}</span>
                      <span className="font-semibold" style={{ color: s.color }}>{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* How to climb */}
            <div className="glass-card rounded-2xl p-5">
              <h3 className="font-display font-semibold mb-3">How to Climb Ranks</h3>
              <div className="space-y-2.5">
                {[
                  { tip: "Complete daily challenges", xp: "+50-300 XP" },
                  { tip: "Maintain streaks", xp: "Bonus XP" },
                  { tip: "Join weekly competitions", xp: "+1000 XP" },
                  { tip: "Invite friends to join", xp: "+200 XP each" },
                ].map(t => (
                  <div key={t.tip} className="flex justify-between text-xs">
                    <span className="text-[#88aa88]">• {t.tip}</span>
                    <span className="text-[#00ff88] font-semibold">{t.xp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <AIAssistant />
    </main>
  );
}
