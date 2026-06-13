"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users, Zap, TreePine, TrendingUp, Flag, ShieldCheck,
  Settings, Bell, Search, BarChart3, AlertTriangle,
  CheckCircle, Clock, Globe2, Award, Trash2, Eye, Edit3, Plus
} from "lucide-react";
import Navbar from "@/components/Navbar";
import AIAssistant from "@/components/AIAssistant";

const adminStats = [
  { icon: Users, label: "Total Users", value: "125,482", change: "+2,340 this week", color: "#00ff88" },
  { icon: Zap, label: "Active Challenges", value: "512", change: "+18 today", color: "#00d4ff" },
  { icon: TreePine, label: "CO₂ Reduced", value: "45.2K ton", change: "+340 ton this week", color: "#ffd700" },
  { icon: TrendingUp, label: "Daily Active Users", value: "34,201", change: "+8.2% vs yesterday", color: "#f97316" },
];

const recentUsers = [
  { name: "Arjun Sharma", email: "arjun@example.com", country: "🇮🇳", level: 12, xp: "48K", status: "active", joined: "2 days ago" },
  { name: "Emma Wilson", email: "emma@example.com", country: "🇬🇧", level: 15, xp: "62K", status: "active", joined: "5 days ago" },
  { name: "Yuki Tanaka", email: "yuki@example.com", country: "🇯🇵", level: 11, xp: "38K", status: "active", joined: "1 week ago" },
  { name: "Carlos Mendez", email: "carlos@example.com", country: "🇲🇽", level: 8, xp: "22K", status: "warning", joined: "2 weeks ago" },
  { name: "Priya Patel", email: "priya@example.com", country: "🇮🇳", level: 14, xp: "55K", status: "active", joined: "3 weeks ago" },
  { name: "James O'Brien", email: "james@example.com", country: "🇮🇪", level: 6, xp: "14K", status: "inactive", joined: "1 month ago" },
];

const pendingChallenges = [
  { title: "Urban Rooftop Garden", submitter: "Green Team NYC", category: "Nature", xp: 350, status: "pending" },
  { title: "E-Waste Recycling Drive", submitter: "TechGreen Mumbai", category: "Waste", xp: 200, status: "pending" },
  { title: "30-Day Vegan Challenge", submitter: "PlantBase Berlin", category: "Food", xp: 500, status: "review" },
  { title: "Solar-Powered Commute", submitter: "SunRiders SF", category: "Transport", xp: 280, status: "approved" },
];

const reportedContent = [
  { type: "Post", user: "anon_user_44", reason: "Spam / Misinformation", time: "2 hours ago", severity: "high" },
  { type: "Comment", user: "ghost_222", reason: "Inappropriate language", time: "4 hours ago", severity: "medium" },
  { type: "Profile", user: "fake_eco_99", reason: "Fake identity", time: "6 hours ago", severity: "high" },
  { type: "Challenge", user: "promo_bot_1", reason: "Commercial spam", time: "1 day ago", severity: "low" },
];

const weeklyActivity = [
  { day: "Mon", users: 32100, challenges: 8420 },
  { day: "Tue", users: 29800, challenges: 7900 },
  { day: "Wed", users: 35200, challenges: 9100 },
  { day: "Thu", users: 38100, challenges: 10200 },
  { day: "Fri", users: 34201, challenges: 9500 },
  { day: "Sat", users: 40500, challenges: 11800 },
  { day: "Sun", users: 38900, challenges: 10900 },
];

const maxUsers = Math.max(...weeklyActivity.map(d => d.users));

function SettingToggle({ label, desc, initialValue }: { label: string; desc: string; initialValue: boolean }) {
  const [on, setOn] = useState(initialValue);
  return (
    <div className="flex items-center justify-between py-3 border-b border-[rgba(255,255,255,0.04)] last:border-0">
      <div>
        <div className="text-sm font-medium">{label}</div>
        <div className="text-[#557755] text-xs mt-0.5">{desc}</div>
      </div>
      <button
        onClick={() => setOn(!on)}
        aria-pressed={on}
        className={`relative w-12 h-6 rounded-full transition-all ${on ? "bg-[#00ff88]" : "bg-[rgba(255,255,255,0.1)]"}`}
      >
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform ${on ? "translate-x-6" : ""}`} />
      </button>
    </div>
  );
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "users", label: "Users", icon: Users },
    { id: "challenges", label: "Challenges", icon: Zap },
    { id: "moderation", label: "Moderation", icon: ShieldCheck },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const filteredUsers = recentUsers.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-eco-black">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="badge-green">🛡️ Admin Panel</span>
                <span className="text-xs text-[#00ff88] bg-[rgba(0,255,136,0.1)] px-2 py-0.5 rounded-full border border-[rgba(0,255,136,0.2)]">
                  Protected Route
                </span>
              </div>
              <h1 className="section-title">EcoVerse <span className="text-gradient">Dashboard</span></h1>
              <p className="text-[#557755] mt-1 text-sm">Platform management & analytics</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative w-9 h-9 glass rounded-xl flex items-center justify-center text-[#88aa88] hover:text-[#00ff88] transition-colors">
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#f97316] rounded-full text-[9px] font-bold flex items-center justify-center">3</span>
              </button>
              <div className="glass-card rounded-xl px-4 py-2 flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#00ff88] to-[#00cc6a] flex items-center justify-center text-xs font-bold text-[#050a05]">A</div>
                <span className="text-sm font-medium">Admin</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id ? "tab-active" : "tab-inactive border border-[rgba(255,255,255,0.08)] text-[#88aa88]"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {adminStats.map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                  className="stat-card">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${s.color}15`, border: `1px solid ${s.color}25` }}>
                      <s.icon className="w-5 h-5" style={{ color: s.color }} />
                    </div>
                    <TrendingUp className="w-3.5 h-3.5 text-[#00ff88]" />
                  </div>
                  <div className="text-2xl font-display font-bold mb-0.5" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-[#557755] text-xs mb-1">{s.label}</div>
                  <div className="text-[#00ff88] text-[10px] font-medium">{s.change}</div>
                </motion.div>
              ))}
            </div>

            {/* Weekly Activity Chart */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display font-semibold">Weekly Platform Activity</h2>
                <div className="flex gap-4 text-xs text-[#557755]">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-[#00ff88] inline-block" />Users</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-[#00d4ff] inline-block" />Challenges</span>
                </div>
              </div>
              <div className="flex items-end gap-3 h-40">
                {weeklyActivity.map((d) => (
                  <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex flex-col gap-1 items-center">
                      <div
                        className="w-full rounded-t-md transition-all duration-500"
                        style={{ height: `${(d.users / maxUsers) * 120}px`, background: "linear-gradient(to top, #00ff88, #00ff8855)" }}
                      />
                      <div
                        className="w-full rounded-t-md transition-all duration-500"
                        style={{ height: `${(d.challenges / maxUsers) * 80}px`, background: "linear-gradient(to top, #00d4ff, #00d4ff55)", marginTop: "-4px" }}
                      />
                    </div>
                    <span className="text-[10px] text-[#557755]">{d.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Summary Row */}
            <div className="grid md:grid-cols-3 gap-5">
              {/* Top Countries */}
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-display font-semibold text-sm mb-4 flex items-center gap-2">
                  <Globe2 className="w-4 h-4 text-[#00ff88]" /> Top Countries
                </h3>
                {[
                  { flag: "🇺🇸", name: "USA", users: "32.4K", pct: 26 },
                  { flag: "🇮🇳", name: "India", users: "28.1K", pct: 22 },
                  { flag: "🇬🇧", name: "UK", users: "14.8K", pct: 12 },
                  { flag: "🇩🇪", name: "Germany", users: "11.2K", pct: 9 },
                  { flag: "🇯🇵", name: "Japan", users: "9.6K", pct: 8 },
                ].map(c => (
                  <div key={c.name} className="mb-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="flex items-center gap-1.5">{c.flag} {c.name}</span>
                      <span className="text-[#88aa88]">{c.users}</span>
                    </div>
                    <div className="progress-bar h-1.5">
                      <div className="progress-fill" style={{ width: `${c.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-display font-semibold text-sm mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#00d4ff]" /> Recent Activity
                </h3>
                <div className="space-y-3">
                  {[
                    { icon: "🌱", text: "New challenge approved: Cycle to Work", time: "2m ago" },
                    { icon: "🏆", text: "User ArjunS reached Level 12", time: "5m ago" },
                    { icon: "📝", text: "New community post by EmmyW", time: "12m ago" },
                    { icon: "⚡", text: "3 new challenge submissions", time: "25m ago" },
                    { icon: "🚨", text: "Moderation report received", time: "1h ago" },
                  ].map((a, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs">
                      <span className="text-base mt-0.5">{a.icon}</span>
                      <div>
                        <div className="text-[#88aa88]">{a.text}</div>
                        <div className="text-[#557755]">{a.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Platform Health */}
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-display font-semibold text-sm mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#ffd700]" /> Platform Health
                </h3>
                {[
                  { label: "API Response", value: "98ms", status: "excellent", color: "#00ff88" },
                  { label: "Uptime", value: "99.98%", status: "excellent", color: "#00ff88" },
                  { label: "Error Rate", value: "0.02%", status: "excellent", color: "#00ff88" },
                  { label: "CDN Latency", value: "12ms", status: "good", color: "#00d4ff" },
                  { label: "DB Query Avg", value: "45ms", status: "good", color: "#00d4ff" },
                ].map(m => (
                  <div key={m.label} className="flex items-center justify-between py-2 border-b border-[rgba(255,255,255,0.05)] last:border-0">
                    <span className="text-[#88aa88] text-xs">{m.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-semibold" style={{ color: m.color }}>{m.value}</span>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: m.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#557755]" />
                <input
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search users by name or email..."
                  className="eco-input pl-9"
                  aria-label="Search users"
                />
              </div>
              <button className="btn-primary flex items-center gap-2 whitespace-nowrap">
                <Plus className="w-4 h-4" /> Add User
              </button>
            </div>

            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[rgba(0,255,136,0.1)] bg-[rgba(0,255,136,0.03)]">
                      <th className="text-left px-5 py-4 text-xs font-semibold text-[#557755]">USER</th>
                      <th className="text-left px-4 py-4 text-xs font-semibold text-[#557755]">LEVEL / XP</th>
                      <th className="text-left px-4 py-4 text-xs font-semibold text-[#557755]">STATUS</th>
                      <th className="text-left px-4 py-4 text-xs font-semibold text-[#557755]">JOINED</th>
                      <th className="text-left px-4 py-4 text-xs font-semibold text-[#557755]">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user, i) => (
                      <motion.tr
                        key={user.email}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="border-b border-[rgba(255,255,255,0.04)] hover:bg-[rgba(0,255,136,0.03)] transition-colors"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#00ff88] to-[#00cc6a] flex items-center justify-center text-xs font-bold text-[#050a05]">
                              {user.name[0]}
                            </div>
                            <div>
                              <div className="font-medium text-xs">{user.name} {user.country}</div>
                              <div className="text-[#557755] text-[11px]">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-xs font-semibold text-[#00ff88]">Level {user.level}</div>
                          <div className="text-[#557755] text-[11px]">{user.xp} XP</div>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            user.status === "active" ? "bg-[rgba(0,255,136,0.15)] text-[#00ff88]" :
                            user.status === "warning" ? "bg-[rgba(255,215,0,0.15)] text-[#ffd700]" :
                            "bg-[rgba(255,255,255,0.08)] text-[#88aa88]"
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-[#557755] text-xs">{user.joined}</td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <button className="w-7 h-7 glass rounded-lg flex items-center justify-center text-[#88aa88] hover:text-[#00ff88] transition-colors" aria-label="View user">
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button className="w-7 h-7 glass rounded-lg flex items-center justify-center text-[#88aa88] hover:text-[#ffd700] transition-colors" aria-label="Edit user">
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button className="w-7 h-7 glass rounded-lg flex items-center justify-center text-[#88aa88] hover:text-[#f97316] transition-colors" aria-label="Delete user">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Challenges Tab */}
        {activeTab === "challenges" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
            <div className="flex justify-between items-center">
              <h2 className="font-display font-semibold">Challenge Management</h2>
              <button className="btn-primary flex items-center gap-2">
                <Plus className="w-4 h-4" /> New Challenge
              </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {pendingChallenges.map((c, i) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="glass-card rounded-2xl p-5"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-sm mb-1">{c.title}</h3>
                      <div className="text-[#557755] text-xs">by {c.submitter}</div>
                    </div>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      c.status === "approved" ? "bg-[rgba(0,255,136,0.15)] text-[#00ff88]" :
                      c.status === "review" ? "bg-[rgba(255,215,0,0.15)] text-[#ffd700]" :
                      "bg-[rgba(0,212,255,0.15)] text-[#00d4ff]"
                    }`}>
                      {c.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mb-4 text-xs text-[#557755]">
                    <span className="px-2 py-0.5 rounded-full bg-[rgba(0,255,136,0.08)] text-[#00ff88] border border-[rgba(0,255,136,0.2)]">{c.category}</span>
                    <span className="flex items-center gap-1"><Award className="w-3 h-3 text-[#ffd700]" />{c.xp} XP</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 rounded-xl text-xs font-semibold bg-[rgba(0,255,136,0.1)] text-[#00ff88] border border-[rgba(0,255,136,0.25)] hover:bg-[rgba(0,255,136,0.2)] transition-all flex items-center justify-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5" /> Approve
                    </button>
                    <button className="flex-1 py-2 rounded-xl text-xs font-semibold bg-[rgba(249,115,22,0.1)] text-[#f97316] border border-[rgba(249,115,22,0.25)] hover:bg-[rgba(249,115,22,0.2)] transition-all flex items-center justify-center gap-1.5">
                      <Trash2 className="w-3.5 h-3.5" /> Reject
                    </button>
                    <button className="py-2 px-3 rounded-xl text-xs font-semibold glass text-[#88aa88] hover:text-[#e8ffe8] transition-all">
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Moderation Tab */}
        {activeTab === "moderation" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-[rgba(249,115,22,0.08)] border border-[rgba(249,115,22,0.2)]">
              <AlertTriangle className="w-5 h-5 text-[#f97316] flex-shrink-0" />
              <div>
                <div className="font-semibold text-sm">{reportedContent.length} active reports require review</div>
                <div className="text-[#557755] text-xs">Review and action reports to maintain community health</div>
              </div>
            </div>
            <div className="space-y-3">
              {reportedContent.map((r, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="glass-card rounded-2xl p-5 flex items-start justify-between gap-4"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      r.severity === "high" ? "bg-[rgba(249,115,22,0.15)] border border-[rgba(249,115,22,0.3)]" :
                      r.severity === "medium" ? "bg-[rgba(255,215,0,0.15)] border border-[rgba(255,215,0,0.3)]" :
                      "bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.1)]"
                    }`}>
                      <Flag className={`w-4 h-4 ${
                        r.severity === "high" ? "text-[#f97316]" :
                        r.severity === "medium" ? "text-[#ffd700]" : "text-[#88aa88]"
                      }`} />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{r.type} by <span className="text-[#00ff88]">@{r.user}</span></div>
                      <div className="text-[#88aa88] text-xs mt-0.5">{r.reason}</div>
                      <div className="text-[#557755] text-xs mt-1">{r.time}</div>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button className="py-1.5 px-3 rounded-lg text-xs font-semibold bg-[rgba(0,255,136,0.1)] text-[#00ff88] border border-[rgba(0,255,136,0.25)] hover:bg-[rgba(0,255,136,0.2)] transition-all">
                      Dismiss
                    </button>
                    <button className="py-1.5 px-3 rounded-lg text-xs font-semibold bg-[rgba(249,115,22,0.1)] text-[#f97316] border border-[rgba(249,115,22,0.25)] hover:bg-[rgba(249,115,22,0.2)] transition-all">
                      Remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5 max-w-2xl">
            {[
              {
                section: "Platform Settings", items: [
                  { label: "Maintenance Mode", desc: "Temporarily disable public access", toggle: false },
                  { label: "New User Registrations", desc: "Allow new users to sign up", toggle: true },
                  { label: "Community Posts", desc: "Allow users to create community posts", toggle: true },
                  { label: "Challenge Submissions", desc: "Allow public challenge submissions", toggle: true },
                ]
              },
              {
                section: "Notification Settings", items: [
                  { label: "New User Alerts", desc: "Email when user count milestones hit", toggle: true },
                  { label: "Moderation Reports", desc: "Get notified of new reports instantly", toggle: true },
                  { label: "System Errors", desc: "Alert on critical system errors", toggle: true },
                ]
              }
            ].map(group => (
              <div key={group.section} className="glass-card rounded-2xl p-6">
                <h3 className="font-display font-semibold mb-5">{group.section}</h3>
                <div className="space-y-4">
                  {group.items.map((item) => (
                    <SettingToggle
                      key={item.label}
                      label={item.label}
                      desc={item.desc}
                      initialValue={item.toggle}
                    />
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
      <AIAssistant />
    </main>
  );
}
