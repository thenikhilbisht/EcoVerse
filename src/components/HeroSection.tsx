"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Zap, Globe, TrendingDown, Users, ChevronDown } from "lucide-react";

// Floating particle component
function Particle({ delay = 0, size = 4, x = 50, y = 50 }: { delay?: number; size?: number; x?: number; y?: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-[#00ff88] opacity-30 pointer-events-none"
      style={{ width: size, height: size, left: `${x}%`, top: `${y}%` }}
      animate={{ y: [-20, 20, -20], opacity: [0.2, 0.5, 0.2] }}
      transition={{ duration: 6 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

// Animated Earth Globe
function EarthGlobe() {
  return (
    <div className="relative w-64 h-64 md:w-96 md:h-96 mx-auto">
      {/* Glow */}
      <div className="absolute inset-0 rounded-full bg-[#00ff88] opacity-10 blur-3xl scale-110" />
      {/* Outer ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border border-dashed border-[rgba(0,255,136,0.2)]"
      />
      {/* Middle ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-4 rounded-full border border-[rgba(0,212,255,0.15)]"
        style={{ borderStyle: "dashed" }}
      />
      {/* Globe body */}
      <div className="absolute inset-8 rounded-full earth-glow overflow-hidden"
        style={{ background: "radial-gradient(circle at 35% 35%, #1a3a1a 0%, #0a1f0a 40%, #050a05 100%)" }}>
        {/* Continents (SVG overlay) */}
        <svg viewBox="0 0 100 100" className="w-full h-full opacity-70">
          <ellipse cx="30" cy="40" rx="18" ry="12" fill="#00ff88" opacity="0.3" />
          <ellipse cx="55" cy="35" rx="22" ry="14" fill="#00ff88" opacity="0.25" />
          <ellipse cx="65" cy="60" rx="10" ry="16" fill="#00ff88" opacity="0.2" />
          <ellipse cx="35" cy="65" rx="8" ry="6" fill="#00ff88" opacity="0.2" />
          <ellipse cx="75" cy="42" rx="6" ry="4" fill="#00ff88" opacity="0.15" />
        </svg>
        {/* Shine */}
        <div className="absolute top-4 left-6 w-8 h-6 rounded-full bg-white opacity-10 blur-sm" />
      </div>

      {/* Orbiting dots */}
      {[0, 90, 180, 270].map((deg, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
        >
          <div
            className="absolute w-2.5 h-2.5 rounded-full"
            style={{
              background: i % 2 === 0 ? "#00ff88" : "#00d4ff",
              boxShadow: `0 0 8px ${i % 2 === 0 ? "#00ff88" : "#00d4ff"}`,
              top: "50%",
              left: deg < 180 ? "0" : "100%",
              transform: "translateY(-50%)",
            }}
          />
        </motion.div>
      ))}

      {/* Stats floating around globe */}
      <motion.div
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-2 -right-4 glass-card rounded-xl px-3 py-2 text-xs"
      >
        <div className="text-gradient font-bold">-2.4°C</div>
        <div className="text-[#557755]">Target</div>
      </motion.div>
      <motion.div
        animate={{ y: [8, -8, 8] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-2 -left-4 glass-card rounded-xl px-3 py-2 text-xs"
      >
        <div className="text-[#00ff88] font-bold">125K</div>
        <div className="text-[#557755]">Warriors</div>
      </motion.div>
    </div>
  );
}

// Stats counter
function CounterStat({ value, label, color = "#00ff88" }: { value: string; label: string; color?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className="font-display text-3xl md:text-4xl font-bold mb-1" style={{ color }}>
        {value}
      </div>
      <div className="text-[#557755] text-sm">{label}</div>
    </motion.div>
  );
}

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const particles = [
    { x: 10, y: 20, size: 3, delay: 0 }, { x: 85, y: 15, size: 5, delay: 1 },
    { x: 20, y: 70, size: 4, delay: 2 }, { x: 90, y: 60, size: 3, delay: 0.5 },
    { x: 50, y: 85, size: 6, delay: 1.5 }, { x: 70, y: 30, size: 3, delay: 3 },
    { x: 5, y: 50, size: 4, delay: 2.5 }, { x: 95, y: 80, size: 3, delay: 0.8 },
    { x: 40, y: 10, size: 5, delay: 1.2 }, { x: 60, y: 95, size: 4, delay: 2.2 },
  ];

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-eco-mesh">
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-40" />

      {/* Radial glow */}
      <div className="absolute inset-0 bg-hero-gradient" />

      {/* Particles */}
      {particles.map((p, i) => <Particle key={i} {...p} />)}

      <motion.div style={{ y, opacity }} className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center pt-28 pb-16">
          {/* Left: Copy */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 badge-green mb-6"
            >
              <span className="pulse-dot w-1.5 h-1.5" />
              <span>🌍 Global Sustainability Platform</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="section-title mb-6"
            >
              <span className="block text-[#e8ffe8]">Track. Reduce.</span>
              <span className="block text-gradient">Compete.</span>
              <span className="block text-[#e8ffe8]">Save Earth.</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="section-subtitle mb-8 mx-auto lg:mx-0"
            >
              Join 125,000+ eco-warriors reducing their carbon footprint with AI-powered
              tracking, gamified challenges, and global community competitions.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href="/challenges">
                <button id="cta-join-challenge" className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center">
                  <Zap className="w-4 h-4" /> Join Challenge
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/#calculator">
                <button id="cta-calculate-carbon" className="btn-secondary flex items-center gap-2 w-full sm:w-auto justify-center">
                  <Globe className="w-4 h-4" /> Calculate Carbon
                </button>
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-4 mt-8 justify-center lg:justify-start flex-wrap"
            >
              {["🏆 #1 Eco Platform", "🤖 AI-Powered", "🌱 Carbon Verified"].map((tag) => (
                <span key={tag} className="text-[#557755] text-xs flex items-center gap-1">{tag}</span>
              ))}
            </motion.div>
          </div>

          {/* Right: Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <EarthGlobe />
          </motion.div>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="glass-card rounded-2xl p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          <CounterStat value="125K+" label="Active Warriors" color="#00ff88" />
          <CounterStat value="45K ton" label="CO₂ Reduced" color="#00d4ff" />
          <CounterStat value="500+" label="Eco Challenges" color="#ffd700" />
          <CounterStat value="89" label="Countries" color="#00ff88" />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#557755]"
      >
        <span className="text-xs">Scroll to explore</span>
        <ChevronDown className="w-4 h-4" />
      </motion.div>
    </section>
  );
}
