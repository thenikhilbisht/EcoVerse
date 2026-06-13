"use client";

import { motion } from "framer-motion";
import { Leaf, Target, Globe, Users, Zap, Mail, MapPin, Phone, Send, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIAssistant from "@/components/AIAssistant";

const team = [
  { name: "Alex Green", role: "CEO & Co-Founder", emoji: "🌱", bio: "Former Tesla engineer passionate about climate tech." },
  { name: "Priya Singh", role: "CTO", emoji: "💻", bio: "AI/ML expert with 10 years in sustainability analytics." },
  { name: "Marcus Chen", role: "Head of Product", emoji: "🎨", bio: "UX designer who believes great design can save the planet." },
  { name: "Sofia Ramirez", role: "Head of Community", emoji: "🌍", bio: "Climate activist and community builder with global networks." },
];

const values = [
  { icon: Target, title: "Mission-Driven", desc: "Every feature we build must contribute to real carbon reduction.", color: "#00ff88" },
  { icon: Globe, title: "Globally Inclusive", desc: "Accessibility and impact for users across all 89 countries.", color: "#00d4ff" },
  { icon: Users, title: "Community First", desc: "Built by the community, for the community. Open feedback always.", color: "#ffd700" },
  { icon: Zap, title: "AI-Powered", desc: "Cutting-edge AI to give personalized, actionable sustainability insights.", color: "#a78bfa" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-eco-black">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <span className="badge-green mb-4 inline-block">🌱 About EcoVerse</span>
          <h1 className="section-title mb-6">
            Built to <span className="text-gradient">Save the Planet</span>
          </h1>
          <p className="section-subtitle mx-auto text-center max-w-2xl">
            EcoVerse was founded in 2024 with a single mission: make sustainability addictive.
            We combine AI, gamification, and community to create the world&apos;s most engaging carbon reduction platform.
          </p>
        </motion.div>

        {/* Mission Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { value: "2024", label: "Founded", color: "#00ff88" },
            { value: "125K+", label: "Warriors", color: "#00d4ff" },
            { value: "89", label: "Countries", color: "#ffd700" },
            { value: "45K ton", label: "CO₂ Saved", color: "#a78bfa" },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="stat-card text-center">
              <div className="text-3xl font-display font-bold mb-1" style={{ color: s.color }}>{s.value}</div>
              <div className="text-[#557755] text-sm">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="section-title text-center mb-10">Our <span className="text-gradient">Core Values</span></h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6 text-center">
                <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center"
                  style={{ background: `${v.color}15`, border: `1px solid ${v.color}30` }}>
                  <v.icon className="w-6 h-6" style={{ color: v.color }} />
                </div>
                <h3 className="font-display font-semibold mb-2">{v.title}</h3>
                <p className="text-[#557755] text-sm">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="section-title text-center mb-10">Meet the <span className="text-gradient">Team</span></h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((member, i) => (
              <motion.div key={member.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6 text-center">
                <div className="text-5xl mb-3">{member.emoji}</div>
                <h3 className="font-semibold text-sm mb-1">{member.name}</h3>
                <div className="badge-green mb-3 text-[10px]">{member.role}</div>
                <p className="text-[#557755] text-xs">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div id="contact" className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="section-title mb-4">Get in <span className="text-gradient">Touch</span></h2>
            <p className="text-[#557755] text-sm mb-6">Have questions, partnership ideas, or want to join our mission? We&apos;d love to hear from you.</p>
            <div className="space-y-4">
              {[
                { icon: Mail, text: "hello@ecoverse.earth" },
                { icon: MapPin, text: "Planet Earth, Solar System" },
                { icon: Phone, text: "+1 (555) ECO-VRSZ" },
              ].map(c => (
                <div key={c.text} className="flex items-center gap-3 text-[#88aa88] text-sm">
                  <div className="w-9 h-9 glass-card rounded-xl flex items-center justify-center flex-shrink-0">
                    <c.icon className="w-4 h-4 text-[#00ff88]" />
                  </div>
                  {c.text}
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="First name" className="eco-input" aria-label="First name" />
                <input placeholder="Last name" className="eco-input" aria-label="Last name" />
              </div>
              <input placeholder="Email address" type="email" className="eco-input" aria-label="Email" />
              <input placeholder="Subject" className="eco-input" aria-label="Subject" />
              <textarea placeholder="Your message..." rows={4} className="eco-input resize-none" aria-label="Message" />
              <button className="btn-primary w-full flex items-center justify-center gap-2">
                <Send className="w-4 h-4" /> Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <AIAssistant />
    </main>
  );
}
