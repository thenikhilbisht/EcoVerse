"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Crown, ArrowRight, Flame, Shield, Star, Leaf } from "lucide-react";

const leaderboard = [
  { rank: 1, name: "Arjun Sharma",  country: "🇮🇳", countryLabel: "India",          xp: 48520, co2: 3.2, level: "Carbon Master",  avatar: "AS", streak: 142 },
  { rank: 2, name: "Emma Wilson",   country: "🇬🇧", countryLabel: "United Kingdom", xp: 45100, co2: 2.8, level: "Earth Guardian", avatar: "EW", streak: 98  },
  { rank: 3, name: "Lena Fischer",  country: "🇩🇪", countryLabel: "Germany",        xp: 41890, co2: 3.5, level: "Earth Guardian", avatar: "LF", streak: 87  },
  { rank: 4, name: "Yuki Tanaka",   country: "🇯🇵", countryLabel: "Japan",          xp: 38760, co2: 2.1, level: "Climate Hero",   avatar: "YT", streak: 76  },
  { rank: 5, name: "Carlos Reyes",  country: "🇲🇽", countryLabel: "Mexico",         xp: 35420, co2: 3.8, level: "Climate Hero",   avatar: "CR", streak: 65  },
  { rank: 6, name: "Priya Nair",    country: "🇮🇳", countryLabel: "India",          xp: 32100, co2: 2.9, level: "Eco Warrior",   avatar: "PN", streak: 54  },
  { rank: 7, name: "James O'Brien", country: "🇺🇸", countryLabel: "United States",  xp: 28950, co2: 4.2, level: "Eco Warrior",   avatar: "JO", streak: 43  },
];

// Top-3 displayed in podium order: [#2, #1, #3]
const podium = [leaderboard[1], leaderboard[0], leaderboard[2]];

const rankColors: Record<number, string> = { 1: "#ffd700", 2: "#c0c0c0", 3: "#cd7f32" };
const rankLabels: Record<number, string> = { 1: "Gold", 2: "Silver", 3: "Bronze" };

const levels = [
  { name: "Green Beginner", icon: Leaf,   color: "#00ff88", minXP: 0     },
  { name: "Eco Warrior",    icon: Shield, color: "#00d4ff", minXP: 1000  },
  { name: "Climate Hero",   icon: Star,   color: "#ffd700", minXP: 10000 },
  { name: "Earth Guardian", icon: Flame,  color: "#f97316", minXP: 25000 },
  { name: "Carbon Master",  icon: Crown,  color: "#a78bfa", minXP: 40000 },
];

export default function LeaderboardSection() {
  return (
    <section className="py-20 relative" aria-labelledby="leaderboard-heading">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_60%,rgba(0,212,255,0.05)_0%,transparent_60%)]"
        aria-hidden="true"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6"
        >
          <div>
            <span className="badge-gold mb-4 inline-block">🏆 Global Rankings</span>
            <h2 id="leaderboard-heading" className="section-title">
              Top <span className="text-gradient">Eco Warriors</span>
            </h2>
            <p className="section-subtitle mt-3">Compete globally. Rise through the ranks. Save more carbon.</p>
          </div>
          <Link
            href="/leaderboard"
            className="btn-secondary flex items-center gap-2 whitespace-nowrap"
          >
            Full Leaderboard <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Leaderboard table */}
          <div className="lg:col-span-2 glass-card rounded-2xl overflow-hidden">
            {/* Top 3 podium */}
            <div
              className="grid grid-cols-3 gap-3 p-6 border-b border-[rgba(0,255,136,0.08)]"
              aria-label="Top 3 eco warriors podium"
            >
              {podium.map((user, i) => {
                // i=0 → #2 (silver), i=1 → #1 (gold, center), i=2 → #3 (bronze)
                const isCenter = i === 1;
                const color = rankColors[user.rank];
                return (
                  <motion.div
                    key={user.rank}
                    initial={{ opacity: 0, y: isCenter ? -20 : 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`flex flex-col items-center gap-2 ${
                      i === 0 ? "order-1" : i === 1 ? "order-2" : "order-3"
                    }`}
                    aria-label={`Rank #${user.rank}: ${user.name} from ${user.countryLabel} — ${(user.xp / 1000).toFixed(1)}k XP`}
                  >
                    <div
                      className="text-xs font-bold"
                      style={{ color }}
                      aria-hidden="true"
                    >
                      #{user.rank}
                    </div>

                    <div className="relative">
                      <div
                        className={`rounded-full flex items-center justify-center font-bold ${isCenter ? "w-16 h-16 text-base" : "w-12 h-12 text-sm"}`}
                        style={{
                          background: `${color}20`,
                          border: `2px solid ${color}`,
                          color,
                        }}
                        aria-hidden="true"
                      >
                        {user.avatar}
                      </div>
                      {isCenter && (
                        <Crown
                          className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 text-[#ffd700]"
                          aria-hidden="true"
                        />
                      )}
                    </div>

                    <div className="text-center">
                      <div className="text-xs font-semibold truncate max-w-[80px]">
                        {user.name.split(" ")[0]}
                      </div>
                      <div
                        className="text-[#557755] text-xs"
                        role="img"
                        aria-label={user.countryLabel}
                      >
                        {user.country}
                      </div>
                      <div className="text-xs font-mono" style={{ color }} aria-hidden="true">
                        {(user.xp / 1000).toFixed(1)}k XP
                      </div>
                      <div className="sr-only">
                        {rankLabels[user.rank]} medal — {user.streak} day streak
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Ranks 4–7 */}
            <ol
              className="divide-y divide-[rgba(0,255,136,0.06)]"
              aria-label="Leaderboard positions 4 to 7"
              start={4}
            >
              {leaderboard.slice(3).map((user, i) => (
                <motion.li
                  key={user.rank}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-4 px-6 py-3.5 hover:bg-[rgba(0,255,136,0.04)] transition-colors"
                >
                  <span className="w-6 text-center text-sm text-[#557755] font-mono" aria-label={`Rank ${user.rank}`}>
                    #{user.rank}
                  </span>
                  <div
                    className="w-9 h-9 rounded-full bg-[rgba(0,255,136,0.1)] border border-[rgba(0,255,136,0.2)] flex items-center justify-center text-xs font-bold text-[#00ff88]"
                    aria-hidden="true"
                  >
                    {user.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm flex items-center gap-2">
                      {user.name}{" "}
                      <span role="img" aria-label={user.countryLabel}>
                        {user.country}
                      </span>
                    </div>
                    <div className="text-[#557755] text-xs">{user.level}</div>
                  </div>
                  <div className="text-right" aria-label={`${(user.xp / 1000).toFixed(1)}k XP`}>
                    <div className="text-sm font-mono text-[#00ff88]">{(user.xp / 1000).toFixed(1)}k</div>
                    <div className="text-[#557755] text-xs" aria-hidden="true">XP</div>
                  </div>
                  <div
                    className="flex items-center gap-1 text-[#ffd700] text-xs"
                    aria-label={`${user.streak} day streak`}
                  >
                    <Flame className="w-3.5 h-3.5" aria-hidden="true" />
                    {user.streak}d
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Rank System */}
            <div className="glass-card rounded-2xl p-5">
              <h3 className="font-display font-semibold mb-4" id="rank-system-heading">
                Rank System
              </h3>
              <ol
                className="space-y-3 list-none p-0 m-0"
                aria-labelledby="rank-system-heading"
              >
                {levels.map((level, i) => (
                  <motion.li
                    key={level.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-3 p-3 rounded-xl transition-colors hover:bg-[rgba(255,255,255,0.03)]"
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{
                        background: `${level.color}15`,
                        border: `1px solid ${level.color}30`,
                      }}
                      aria-hidden="true"
                    >
                      <level.icon className="w-4 h-4" style={{ color: level.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{level.name}</div>
                      <div className="text-[#557755] text-xs">
                        {level.minXP.toLocaleString()}+ XP
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ol>
            </div>

            {/* Your Position */}
            <div className="glass-card rounded-2xl p-5">
              <h3 className="font-display font-semibold mb-3">Your Position</h3>
              <div className="text-center py-4">
                <div
                  className="text-4xl font-display font-bold text-gradient mb-1"
                  aria-label="Global rank: number 248"
                >
                  #248
                </div>
                <div className="text-[#557755] text-sm mb-4">Global Rank</div>
                <div
                  className="progress-bar h-2 mb-2"
                  role="progressbar"
                  aria-valuenow={62}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Progress toward rank #200: 62%"
                >
                  <div className="progress-fill" style={{ width: "62%" }} />
                </div>
                <div className="text-xs text-[#557755]">2,100 XP to reach #200</div>
              </div>
              <Link href="/leaderboard" className="btn-ghost w-full block text-center">
                View Full Board
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
