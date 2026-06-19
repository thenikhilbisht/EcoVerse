"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { TreePine, Droplets, Zap, TrendingDown, Flame, Star, Target, Calendar, Bot, ArrowUp, ArrowDown } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIAssistant from "@/components/AIAssistant";
import { getHistory, type HistoryEntry } from "@/lib/historyStore";

// Fallback demo data
const DEMO_WEEKLY = [
  { day: "Mon", co2: 12.4, target: 10 }, { day: "Tue", co2: 9.8, target: 10 },
  { day: "Wed", co2: 8.2, target: 10 }, { day: "Thu", co2: 11.1, target: 10 },
  { day: "Fri", co2: 7.6, target: 10 }, { day: "Sat", co2: 6.9, target: 10 },
  { day: "Sun", co2: 8.4, target: 10 },
];

const DEMO_MONTHLY = [
  { month: "Jan", saved: 45 }, { month: "Feb", saved: 62 }, { month: "Mar", saved: 58 },
  { month: "Apr", saved: 78 }, { month: "May", saved: 91 }, { month: "Jun", saved: 85 },
];

const streakDays = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  completed: i < 22,
  partial: i === 22,
}));

const recentAchievements = [
  { emoji: "🌱", title: "First Step", desc: "Completed your first challenge", xp: 50, date: "Today" },
  { emoji: "🔥", title: "7-Day Streak", desc: "Active for 7 consecutive days", xp: 200, date: "Yesterday" },
  { emoji: "♻️", title: "Plastic Free", desc: "Zero plastic for 3 days", xp: 150, date: "2 days ago" },
  { emoji: "🚴", title: "Cycle Master", desc: "Cycled 50km total", xp: 300, date: "5 days ago" },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-dark rounded-xl p-3 border border-[rgba(0,255,136,0.2)] text-xs">
        <div className="font-semibold mb-1">{label}</div>
        {payload.map((p) => (
          <div key={p.name} className="flex gap-2">
            <span className="text-[#6b9a6b]">{p.name}:</span>
            <span className="text-[#00ff88] font-mono">{p.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"7D" | "30D" | "90D">("7D");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isDemo, setIsDemo] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
    const data = getHistory();
    if (data.length === 0) {
      setIsDemo(true);
    } else {
      setHistory(data);
    }
  }, []);

  // Process history data for charts based on activeTab
  let chartData: any[] = [];
  if (!mounted || isDemo) {
    chartData = activeTab === "7D" ? DEMO_WEEKLY : DEMO_MONTHLY;
  } else {
    // Process real history
    // Filter by days
    const daysToLookBack = activeTab === "7D" ? 7 : activeTab === "30D" ? 30 : 90;
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - daysToLookBack);
    const cutoffISO = cutoff.toISOString();
    
    const filtered = history.filter(h => h.timestamp >= cutoffISO);
    
    // Group by day (YYYY-MM-DD)
    const grouped = new Map<string, number[]>();
    filtered.forEach(entry => {
      const day = entry.timestamp.split("T")[0];
      if (!grouped.has(day)) grouped.set(day, []);
      grouped.get(day)!.push(entry.result.monthlyKg); // Show monthly rate recorded that day
    });
    
    // Average per day and format
    const sortedDays = Array.from(grouped.keys()).sort();
    chartData = sortedDays.map(dayStr => {
      const vals = grouped.get(dayStr)!;
      const avg = vals.reduce((a,b) => a + b, 0) / vals.length;
      // Short format for label e.g. "Oct 12"
      const date = new Date(dayStr);
      const label = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
      return { 
        day: label, 
        co2: Math.round(avg),
        target: Math.round(avg * 0.8) // Fake target line just for visual
      };
    });

    if (chartData.length === 0) {
      // Fallback if no data in period
      chartData = [{ day: "No Data", co2: 0, target: 0 }];
    }
  }

  // Calculate current impact stats based on latest calculation if available
  const latestCalc = history.length > 0 ? history[history.length - 1].result : null;
  const currentMonthlyKg = latestCalc ? Math.round(latestCalc.monthlyKg) : 284;
  
  return (
    <main className="min-h-screen bg-eco-black">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span className="badge-green mb-2 inline-block">📊 My Dashboard</span>
              <h1 className="section-title">Welcome back, <span className="text-gradient">Eco Warrior</span> 👋</h1>
              <p className="text-[#88aa88] mt-1">Level 12 • 2,450 XP • 22-day streak 🔥</p>
            </div>
            <div className="flex gap-3">
              <div className="glass-card rounded-xl px-4 py-2 flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#ffd700]" />
                <span className="text-sm font-semibold text-[#ffd700]">22 Day Streak</span>
              </div>
              <div className="glass-card rounded-xl px-4 py-2 flex items-center gap-2">
                <Star className="w-4 h-4 text-[#00ff88]" />
                <span className="text-sm font-semibold">Global #248</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Impact Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { icon: TrendingDown, label: "Your CO₂ / mo", value: `${currentMonthlyKg} kg`, change: isDemo ? "+12%" : "Live", up: isDemo, color: "#00ff88" },
            { icon: TreePine, label: "Trees Equivalent", value: "14 trees", change: "+3", up: true, color: "#00d4ff" },
            { icon: Zap, label: "Energy Saved", value: "342 kWh", change: "+8%", up: true, color: "#ffd700" },
            { icon: Droplets, label: "Water Saved", value: "4,200 L", change: "+5%", up: true, color: "#60a5fa" },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="stat-card">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${stat.color}15`, border: `1px solid ${stat.color}30` }}>
                  <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
                <span className="flex items-center gap-1 text-xs font-medium text-[#00ff88]">
                  {stat.up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3 text-[#f97316]" />}
                  {stat.change}
                </span>
              </div>
              <div className="text-xl font-display font-bold" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-[#88aa88] text-xs mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid lg:grid-cols-3 gap-5 mb-6">
          {/* Main chart */}
          <div className="lg:col-span-2 glass-card rounded-2xl p-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display font-semibold flex items-center gap-2">
                Carbon History
                {isDemo && mounted && (
                  <span className="badge-blue text-[10px] ml-2 px-1.5 py-0.5 border border-[#00d4ff] bg-[#00d4ff]/10">DEMO DATA</span>
                )}
              </h2>
              <div className="flex gap-2">
                {(["7D", "30D", "90D"] as const).map(t => (
                  <button key={t} onClick={() => setActiveTab(t)}
                    className={`text-xs px-3 py-1.5 rounded-lg transition-all ${activeTab === t ? "tab-active" : "tab-inactive"}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="co2Grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00ff88" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#00ff88" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" tick={{ fill: "#6b9a6b", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#6b9a6b", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="co2" name="CO₂ kg/mo" stroke="#00ff88" fill="url(#co2Grad)" strokeWidth={2} />
                  <Area type="monotone" dataKey="target" name="Target" stroke="#00d4ff" fill="none" strokeDasharray="4 4" strokeWidth={1.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            {isDemo && mounted && (
              <p className="text-xs text-[#6b9a6b] text-center mt-2">
                No real calculations saved yet. Use the <Link href="/#calculator" className="text-[#00ff88] hover:underline">calculator</Link> to start tracking your actual footprint!
              </p>
            )}
          </div>

          {/* AI Insight */}
          <div className="glass-card rounded-2xl p-5 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[rgba(0,255,136,0.15)] flex items-center justify-center">
                <Bot className="w-4 h-4 text-[#00ff88]" />
              </div>
              <h2 className="font-display font-semibold text-sm">AI Insight</h2>
            </div>
            <div className="flex-1 space-y-3">
              {[
                { title: "Best performance", desc: "Friday — 7.6 kg CO₂. 24% below your average!", color: "#00ff88" },
                { title: "Improvement area", desc: "Thursday spikes — likely car usage. Try cycling!", color: "#ffd700" },
                { title: "Weekly forecast", desc: "On track to save 18% more than last week 📈", color: "#00d4ff" },
              ].map(insight => (
                <div key={insight.title} className="p-3 rounded-xl"
                  style={{ background: `${insight.color}08`, border: `1px solid ${insight.color}20` }}>
                  <div className="text-xs font-semibold mb-0.5" style={{ color: insight.color }}>{insight.title}</div>
                  <div className="text-[#88aa88] text-xs">{insight.desc}</div>
                </div>
              ))}
            </div>
            <button className="btn-ghost mt-4 w-full text-xs">Full AI Analysis →</button>
          </div>
        </div>

        {/* Streak Calendar + Achievements (DEMO DATA for Gamification) */}
        <div className="grid lg:grid-cols-2 gap-5 mb-6">
          {/* Streak Calendar */}
          <div className="glass-card rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#00ff88]" /> Activity Calendar
              </h2>
              <span className="badge-green text-xs">22 day streak 🔥</span>
            </div>
            <div className="grid grid-cols-10 gap-1.5">
              {streakDays.map((d) => (
                <div key={d.day}
                  title={`Day ${d.day}`}
                  className={`w-full aspect-square rounded-md transition-all ${
                    d.completed ? "bg-[#00ff88] shadow-[0_0_6px_rgba(0,255,136,0.5)]" :
                    d.partial ? "bg-[#ffd700] shadow-[0_0_6px_rgba(255,215,0,0.5)]" :
                    "bg-[rgba(255,255,255,0.06)]"
                  }`} />
              ))}
            </div>
            <div className="flex items-center gap-4 mt-4 text-xs text-[#6b9a6b]">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-[#00ff88] rounded-sm" /> Completed</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-[#ffd700] rounded-sm" /> Partial</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-[rgba(255,255,255,0.1)] rounded-sm" /> Missed</span>
            </div>
          </div>

          {/* Achievements */}
          <div className="glass-card rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold flex items-center gap-2">
                <Star className="w-4 h-4 text-[#ffd700]" /> Recent Achievements
              </h2>
              <button className="text-xs text-[#6b9a6b] hover:text-[#00ff88] transition-colors">View all →</button>
            </div>
            <div className="space-y-3">
              {recentAchievements.map((a, i) => (
                <motion.div key={a.title} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(0,255,136,0.05)] transition-colors">
                  <div className="text-2xl">{a.emoji}</div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{a.title}</div>
                    <div className="text-[#6b9a6b] text-xs">{a.desc}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[#ffd700] text-xs font-semibold">+{a.xp} XP</div>
                    <div className="text-[#6b9a6b] text-xs">{a.date}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Current Challenges Progress */}
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display font-semibold flex items-center gap-2">
              <Target className="w-4 h-4 text-[#00ff88]" /> Active Challenges
            </h2>
            <button className="text-xs text-[#6b9a6b] hover:text-[#00ff88] transition-colors">Join more →</button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { emoji: "🚴", title: "Cycle to Work", day: "Day 5/7", progress: 71, color: "#00ff88" },
              { emoji: "🥦", title: "Plant-Based Week", day: "Day 3/7", progress: 43, color: "#00d4ff" },
              { emoji: "♻️", title: "Zero Plastic", day: "Day 1/1", progress: 85, color: "#ffd700" },
            ].map(c => (
              <div key={c.title} className="p-4 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)]">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{c.emoji}</span>
                  <div>
                    <div className="text-sm font-medium">{c.title}</div>
                    <div className="text-[#6b9a6b] text-xs">{c.day}</div>
                  </div>
                </div>
                <div className="progress-bar h-2 mb-1.5">
                  <div className="progress-fill" style={{ width: `${c.progress}%`,
                    background: `linear-gradient(90deg, ${c.color}, ${c.color}99)` }} />
                </div>
                <div className="text-xs font-semibold" style={{ color: c.color }}>{c.progress}% complete</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
      <AIAssistant />
    </main>
  );
}
