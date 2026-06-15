"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Flame, Clock, Star, Users, ArrowRight, CheckCircle } from "lucide-react";

const challenges = [
  {
    id: 1, emoji: "🚴", title: "Cycle to Work", category: "Transport",
    xp: 150, duration: "7 days", difficulty: "Easy", participants: 4820,
    desc: "Replace your car commute with cycling for a week.",
    color: "#00ff88", progress: 68,
  },
  {
    id: 2, emoji: "🥦", title: "Plant-Based Week", category: "Food",
    xp: 200, duration: "7 days", difficulty: "Medium", participants: 3210,
    desc: "Go fully plant-based for 7 days straight.",
    color: "#00d4ff", progress: 45,
  },
  {
    id: 3, emoji: "🌱", title: "Plant 5 Trees", category: "Nature",
    xp: 300, duration: "30 days", difficulty: "Hard", participants: 2150,
    desc: "Plant and document 5 trees in your community.",
    color: "#ffd700", progress: 32,
  },
  {
    id: 4, emoji: "♻️", title: "Zero Plastic Day", category: "Waste",
    xp: 100, duration: "1 day", difficulty: "Easy", participants: 9980,
    desc: "Spend 24 hours without using single-use plastics.",
    color: "#f97316", progress: 88,
  },
  {
    id: 5, emoji: "💡", title: "Energy Minimalist", category: "Energy",
    xp: 180, duration: "3 days", difficulty: "Medium", participants: 5340,
    desc: "Reduce electricity usage by 50% for 3 days.",
    color: "#a78bfa", progress: 55,
  },
  {
    id: 6, emoji: "🚿", title: "2-Min Shower", category: "Water",
    xp: 120, duration: "14 days", difficulty: "Easy", participants: 7660,
    desc: "Keep all showers under 2 minutes for 2 weeks.",
    color: "#60a5fa", progress: 72,
  },
];

const difficultyColors: Record<string, string> = {
  Easy: "#00ff88", Medium: "#ffd700", Hard: "#f97316",
};

export default function ChallengesSection() {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_30%,rgba(0,255,136,0.06)_0%,transparent_60%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6"
        >
          <div>
            <span className="badge-green mb-4 inline-block">⚡ Eco Challenges</span>
            <h2 className="section-title">
              Join Daily <span className="text-gradient">Missions</span>
            </h2>
            <p className="section-subtitle mt-3">
              Complete eco challenges, earn XP, and unlock badges. Every action counts.
            </p>
          </div>
          <Link href="/challenges" className="btn-secondary flex items-center gap-2 whitespace-nowrap">
            View All Challenges <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </motion.div>

        {/* Challenge Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {challenges.map((challenge, i) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="challenge-card glass-card rounded-2xl p-5 cursor-pointer group"
            >
              {/* Top */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{challenge.emoji}</div>
                  <div>
                    <div className="font-semibold text-sm">{challenge.title}</div>
                    <span className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: `${challenge.color}20`, color: challenge.color, border: `1px solid ${challenge.color}30` }}>
                      {challenge.category}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-1 text-[#ffd700] text-xs font-semibold">
                    <Flame className="w-3.5 h-3.5" /> {challenge.xp} XP
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded font-medium"
                    style={{ color: difficultyColors[challenge.difficulty], background: `${difficultyColors[challenge.difficulty]}15` }}>
                    {challenge.difficulty}
                  </span>
                </div>
              </div>

              {/* Desc */}
              <p className="text-[#557755] text-sm mb-4">{challenge.desc}</p>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-[#557755]">Community progress</span>
                  <span style={{ color: challenge.color }} className="font-semibold">{challenge.progress}%</span>
                </div>
                <div
                  className="progress-bar h-1.5"
                  role="progressbar"
                  aria-label={`${challenge.title} community progress`}
                  aria-valuenow={challenge.progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div className="progress-fill" style={{ width: `${challenge.progress}%`,
                    background: `linear-gradient(90deg, ${challenge.color}, ${challenge.color}99)` }} />
                </div>
              </div>

              {/* Bottom */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-[#557755]">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{challenge.duration}</span>
                  <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{challenge.participants.toLocaleString()}</span>
                </div>
                <button
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all group-hover:shadow-[0_0_15px_rgba(0,255,136,0.3)]"
                  style={{ background: `${challenge.color}20`, color: challenge.color, border: `1px solid ${challenge.color}30` }}
                  aria-label={`Join ${challenge.title}`}
                >
                  <CheckCircle className="w-3.5 h-3.5" /> Join
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 glass-card rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-[rgba(0,255,136,0.2)]"
        >
          <div className="text-center md:text-left">
            <h3 className="font-display text-xl font-bold mb-1">
              🔥 Daily Streak: <span className="text-gradient">Join the streak challenge</span>
            </h3>
            <p className="text-[#557755] text-sm">Complete a challenge every day to maintain your streak and earn bonus XP.</p>
          </div>
          <Link href="/challenges" className="btn-primary flex items-center gap-2 whitespace-nowrap">
            <Star className="w-4 h-4" aria-hidden="true" /> Start Today
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
