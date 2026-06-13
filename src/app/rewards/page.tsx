"use client";

import { motion } from "framer-motion";
import { Gift, Star, Zap, Award, ShoppingBag, Lock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIAssistant from "@/components/AIAssistant";

const rewards = [
  { id: 1, title: "Eco Pioneer Badge", type: "Badge", cost: 500, emoji: "🌱", desc: "Exclusive NFT-style digital badge for early adopters.", unlocked: true, rarity: "Common" },
  { id: 2, title: "Carbon Hero Certificate", type: "Certificate", cost: 1000, emoji: "📜", desc: "Verifiable PDF certificate of your carbon reduction achievement.", unlocked: true, rarity: "Rare" },
  { id: 3, title: "Plant 10 Trees (Real)", type: "Impact", cost: 2000, emoji: "🌳", desc: "We plant 10 real trees in your name in partnership with TreeNation.", unlocked: false, rarity: "Epic" },
  { id: 4, title: "50% Off Eco Store", type: "Coupon", cost: 750, emoji: "🏷️", desc: "Discount coupon for partner eco-friendly product stores.", unlocked: false, rarity: "Common" },
  { id: 5, title: "Carbon Master NFT", type: "NFT", cost: 5000, emoji: "🏆", desc: "Ultra-rare animated NFT card for reaching Carbon Master rank.", unlocked: false, rarity: "Legendary" },
  { id: 6, title: "1 Month Premium", type: "Subscription", cost: 1500, emoji: "⭐", desc: "Unlock all premium features: AI roadmap, voice assistant, AR preview.", unlocked: false, rarity: "Epic" },
  { id: 7, title: "Eco Warrior Hoodie", type: "Merch", cost: 3000, emoji: "👕", desc: "Organic cotton EcoVerse hoodie shipped to your door.", unlocked: false, rarity: "Rare" },
  { id: 8, title: "Yearly Eco Report", type: "Report", cost: 800, emoji: "📊", desc: "Personalized PDF sustainability report with your yearly impact.", unlocked: false, rarity: "Common" },
];

const rarityColors: Record<string, string> = {
  Common: "#88aa88", Rare: "#00d4ff", Epic: "#a78bfa", Legendary: "#ffd700",
};

export default function RewardsPage() {
  const coins = 2450;

  return (
    <main className="min-h-screen bg-eco-black">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <span className="badge-gold mb-3 inline-block">🎁 Rewards Shop</span>
          <h1 className="section-title mb-3">Earn & <span className="text-gradient">Redeem</span></h1>
          <p className="section-subtitle">Exchange your Eco Coins for real-world rewards, certificates, and digital collectibles.</p>
        </motion.div>

        {/* Wallet */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-[rgba(255,215,0,0.2)]">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[rgba(255,215,0,0.15)] flex items-center justify-center">
              <Zap className="w-7 h-7 text-[#ffd700]" />
            </div>
            <div>
              <div className="text-3xl font-display font-bold text-[#ffd700]">{coins.toLocaleString()} 🪙</div>
              <div className="text-[#557755] text-sm">Eco Coins available</div>
            </div>
          </div>
          <div className="flex gap-4 text-center">
            {[
              { label: "Earned this month", value: "+320" },
              { label: "Spent total", value: "−750" },
              { label: "Rewards redeemed", value: "3" },
            ].map(s => (
              <div key={s.label} className="px-4 border-l border-[rgba(255,255,255,0.08)] first:border-0">
                <div className="font-bold text-sm">{s.value}</div>
                <div className="text-[#557755] text-xs">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* How to earn */}
        <div className="glass-card rounded-2xl p-5 mb-8">
          <h2 className="font-display font-semibold mb-4 flex items-center gap-2">
            <Star className="w-4 h-4 text-[#ffd700]" /> How to Earn Eco Coins
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { action: "Complete challenge", coins: "+50–300 🪙" },
              { action: "Daily login", coins: "+10 🪙" },
              { action: "Invite a friend", coins: "+200 🪙" },
              { action: "Weekly top 10", coins: "+500 🪙" },
            ].map(e => (
              <div key={e.action} className="text-center p-3 rounded-xl bg-[rgba(255,215,0,0.08)] border border-[rgba(255,215,0,0.15)]">
                <div className="font-bold text-[#ffd700] text-sm">{e.coins}</div>
                <div className="text-[#557755] text-xs mt-1">{e.action}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Rewards Grid */}
        <h2 className="font-display font-bold text-lg mb-5 flex items-center gap-2">
          <Gift className="w-5 h-5 text-[#00ff88]" /> Available Rewards
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {rewards.map((r, i) => {
            const canAfford = coins >= r.cost;
            return (
              <motion.div key={r.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className={`glass-card rounded-2xl p-5 relative overflow-hidden transition-all ${r.unlocked ? "border border-[rgba(0,255,136,0.2)]" : ""}`}>
                {/* Rarity glow */}
                <div className="absolute top-0 left-0 right-0 h-0.5"
                  style={{ background: `linear-gradient(90deg, transparent, ${rarityColors[r.rarity]}, transparent)` }} />

                {r.unlocked && (
                  <div className="absolute top-3 right-3 badge-green text-[10px]">Owned</div>
                )}

                <div className="text-4xl mb-3">{r.emoji}</div>
                <div className="font-semibold text-sm mb-1">{r.title}</div>
                <p className="text-[#557755] text-xs mb-3 leading-relaxed">{r.desc}</p>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs" style={{ color: rarityColors[r.rarity] }}>{r.rarity}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[rgba(255,255,255,0.05)] text-[#88aa88]">{r.type}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="font-bold text-[#ffd700] text-sm flex items-center gap-1">
                    🪙 {r.cost.toLocaleString()}
                  </div>
                  <button
                    disabled={!canAfford && !r.unlocked}
                    className={`text-xs px-3 py-1.5 rounded-lg font-medium flex items-center gap-1 transition-all ${
                      r.unlocked
                        ? "bg-[rgba(0,255,136,0.1)] text-[#00ff88] border border-[rgba(0,255,136,0.2)]"
                        : canAfford
                          ? "bg-gradient-to-r from-[#ffd700] to-[#ffaa00] text-[#050a05] hover:shadow-[0_0_15px_rgba(255,215,0,0.5)]"
                          : "bg-[rgba(255,255,255,0.05)] text-[#557755] cursor-not-allowed"
                    }`}
                    aria-label={`Redeem ${r.title}`}
                  >
                    {r.unlocked ? <><Award className="w-3 h-3" /> Owned</> : !canAfford ? <><Lock className="w-3 h-3" /> Locked</> : <><Gift className="w-3 h-3" /> Redeem</>}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      <Footer />
      <AIAssistant />
    </main>
  );
}
