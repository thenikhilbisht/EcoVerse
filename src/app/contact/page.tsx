"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail, MapPin, Phone, Send, MessageSquare, Globe, Clock,
  CheckCircle, ChevronDown, Twitter, Github, Linkedin, Instagram,
  ArrowRight, Zap
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIAssistant from "@/components/AIAssistant";

const contactMethods = [
  {
    icon: Mail, title: "Email Us", value: "hello@ecoverse.earth",
    desc: "We reply within 24 hours", color: "#00ff88", href: "mailto:hello@ecoverse.earth"
  },
  {
    icon: MessageSquare, title: "Live Chat", value: "Open EcoBot",
    desc: "Instant AI-powered support", color: "#00d4ff", href: "#"
  },
  {
    icon: Globe, title: "Community", value: "Join Discord",
    desc: "Connect with 125K+ warriors", color: "#a78bfa", href: "#"
  },
  {
    icon: Phone, title: "Schedule Call", value: "Book a meeting",
    desc: "30-min strategy session", color: "#ffd700", href: "#"
  },
];

const faqs = [
  { q: "Is EcoVerse completely free to use?", a: "Yes! EcoVerse is free forever for personal use. We offer a premium plan with advanced AI analytics, voice assistant, and AR features for power users." },
  { q: "How accurate is the AI Carbon Calculator?", a: "Our calculator uses IPCC-certified emission factors and real-time grid carbon data. It's within 5-10% accuracy of professional carbon auditing tools." },
  { q: "Can I use EcoVerse for my organization/company?", a: "Absolutely! We have team and enterprise plans with custom dashboards, employee engagement tracking, and sustainability reporting for ESG compliance." },
  { q: "How are Eco Coins earned and redeemed?", a: "You earn Eco Coins by completing challenges, maintaining streaks, and achieving milestones. They can be redeemed for real-world impact items like tree planting, carbon offsets, and eco-friendly products." },
  { q: "Is my data private and secure?", a: "We take privacy seriously. All data is encrypted at rest and in transit. We never sell your personal data. You can delete your account and all associated data at any time." },
  { q: "How do I get my organization verified on the leaderboard?", a: "Email us with your organization details. We'll verify and issue a verified badge within 3-5 business days." },
];

const offices = [
  { city: "San Francisco", country: "🇺🇸", address: "101 Green St, SF, CA 94102", timezone: "PST (UTC-8)" },
  { city: "London", country: "🇬🇧", address: "42 Eco Lane, Shoreditch, E1 6RF", timezone: "GMT (UTC+0)" },
  { city: "Singapore", country: "🇸🇬", address: "71 Science Park Dr, Singapore 118253", timezone: "SGT (UTC+8)" },
];

function sanitizeText(value: string) {
  return value.replace(/[<>]/g, "").replace(/\s+/g, " ").trim();
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", type: "general" });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });

  const handleInputChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanedName = sanitizeText(form.name);
    const cleanedEmail = sanitizeText(form.email).toLowerCase();
    const cleanedMessage = sanitizeText(form.message);

    const nextErrors = {
      name: cleanedName ? "" : "Please enter your name.",
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanedEmail) ? "" : "Please enter a valid email address.",
      message: cleanedMessage ? "" : "Please include a brief message.",
    };

    setErrors(nextErrors);

    if (nextErrors.name || nextErrors.email || nextErrors.message) return;

    setSubmitted(true);
    setForm({ name: "", email: "", subject: "", message: "", type: "general" });
  };

  return (
    <main className="min-h-screen bg-eco-black">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <span className="badge-green mb-4 inline-block">📬 Get In Touch</span>
          <h1 className="section-title mb-4">
            Let&apos;s Build a <span className="text-gradient">Greener World</span><br />Together
          </h1>
          <p className="section-subtitle mx-auto">
            Have a question, partnership idea, or just want to say hello?
            We&apos;d love to hear from you. Our team replies within 24 hours.
          </p>
        </motion.div>

        {/* Contact Methods */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {contactMethods.map((m, i) => (
            <motion.a
              key={m.title}
              href={m.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass-card rounded-2xl p-5 group hover:scale-[1.03] transition-all duration-300 cursor-pointer block"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                style={{ background: `${m.color}15`, border: `1px solid ${m.color}25` }}>
                <m.icon className="w-5 h-5" style={{ color: m.color }} />
              </div>
              <div className="font-semibold text-sm mb-0.5">{m.title}</div>
              <div className="font-medium text-sm mb-1" style={{ color: m.color }}>{m.value}</div>
              <div className="text-[#557755] text-xs">{m.desc}</div>
            </motion.a>
          ))}
        </div>

        {/* Main Grid: Form + Info */}
        <div className="grid lg:grid-cols-5 gap-8 mb-16">

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3 glass-card rounded-2xl p-6 md:p-8"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full py-12 text-center"
              >
                <div className="w-20 h-20 rounded-2xl bg-[rgba(0,255,136,0.15)] flex items-center justify-center mb-6 border border-[rgba(0,255,136,0.3)]">
                  <CheckCircle className="w-10 h-10 text-[#00ff88]" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-3">Message Sent! 🌱</h3>
                <p className="text-[#88aa88] mb-6 max-w-sm">
                  Thanks for reaching out! Our eco-team will reply within 24 hours.
                  In the meantime, why not join a challenge?
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "", type: "general" }); }}
                  className="btn-secondary flex items-center gap-2"
                >
                  <Send className="w-4 h-4" /> Send Another Message
                </button>
              </motion.div>
            ) : (
              <>
                <h2 className="font-display text-xl font-bold mb-6">Send Us a Message</h2>

                {/* Inquiry Type */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {["general", "partnership", "press", "support", "enterprise"].map(t => (
                    <button
                      key={t}
                      onClick={() => setForm(f => ({ ...f, type: t }))}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                        form.type === t ? "tab-active" : "tab-inactive border border-[rgba(255,255,255,0.08)] text-[#88aa88]"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-[#557755] font-medium mb-1.5 block">Full Name *</label>
                      <input
                        value={form.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="John Smith"
                        className="eco-input"
                        required
                        aria-label="Full name"
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby="name-error"
                      />
                      {errors.name ? <p id="name-error" className="text-xs text-[#f97316] mt-1">{errors.name}</p> : null}
                    </div>
                    <div>
                      <label className="text-xs text-[#557755] font-medium mb-1.5 block">Email Address *</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="john@example.com"
                        className="eco-input"
                        required
                        aria-label="Email address"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby="email-error"
                      />
                      {errors.email ? <p id="email-error" className="text-xs text-[#f97316] mt-1">{errors.email}</p> : null}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-[#557755] font-medium mb-1.5 block">Subject</label>
                    <input
                      value={form.subject}
                      onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                      placeholder="How can we help?"
                      className="eco-input"
                      aria-label="Subject"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-[#557755] font-medium mb-1.5 block">Message *</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Tell us more about your inquiry, idea, or question..."
                      rows={5}
                      className="eco-input resize-none"
                      required
                      aria-label="Message"
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby="message-error"
                      maxLength={1000}
                    />
                    {errors.message ? <p id="message-error" className="text-xs text-[#f97316] mt-1">{errors.message}</p> : null}
                  </div>

                  <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" /> Send Message
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-xs text-[#557755] text-center">
                    🔒 Your data is encrypted and never shared with third parties.
                  </p>
                </form>
              </>
            )}
          </motion.div>

          {/* Sidebar Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 space-y-5"
          >
            {/* Offices */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#00ff88]" /> Our Offices
              </h3>
              <div className="space-y-4">
                {offices.map(o => (
                  <div key={o.city} className="p-3 rounded-xl bg-[rgba(0,255,136,0.04)] border border-[rgba(0,255,136,0.1)]">
                    <div className="flex items-center gap-2 mb-1">
                      <span>{o.country}</span>
                      <span className="font-semibold text-sm">{o.city}</span>
                    </div>
                    <div className="text-[#557755] text-xs mb-1">{o.address}</div>
                    <div className="flex items-center gap-1 text-[#00ff88] text-xs">
                      <Clock className="w-3 h-3" /> {o.timezone}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Response Time */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-display font-semibold mb-4">⚡ Response Times</h3>
              {[
                { channel: "Email", time: "< 24 hours", color: "#00ff88" },
                { channel: "Live Chat (EcoBot)", time: "Instant", color: "#00d4ff" },
                { channel: "Enterprise", time: "< 4 hours", color: "#ffd700" },
                { channel: "Press Inquiries", time: "< 48 hours", color: "#a78bfa" },
              ].map(r => (
                <div key={r.channel} className="flex items-center justify-between py-2 border-b border-[rgba(255,255,255,0.05)] last:border-0">
                  <span className="text-[#88aa88] text-sm">{r.channel}</span>
                  <span className="text-xs font-semibold" style={{ color: r.color }}>{r.time}</span>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-display font-semibold mb-4">🌐 Follow Our Journey</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Twitter, label: "Twitter", handle: "@EcoVerseHQ", color: "#00d4ff" },
                  { icon: Github, label: "GitHub", handle: "ecoverse-app", color: "#e8ffe8" },
                  { icon: Linkedin, label: "LinkedIn", handle: "EcoVerse", color: "#00ff88" },
                  { icon: Instagram, label: "Instagram", handle: "@ecoverse", color: "#f97316" },
                ].map(s => (
                  <a key={s.label} href="#"
                    className="flex items-center gap-2 p-3 rounded-xl bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(0,255,136,0.08)] transition-all group border border-[rgba(255,255,255,0.06)]">
                    <s.icon className="w-4 h-4 flex-shrink-0" style={{ color: s.color }} />
                    <div>
                      <div className="text-xs font-medium">{s.label}</div>
                      <div className="text-[10px] text-[#557755]">{s.handle}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-center mb-10">
            <span className="badge-blue mb-4 inline-block">❓ FAQ</span>
            <h2 className="section-title">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass-card rounded-2xl overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between p-5 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span className="font-medium text-sm pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#00ff88] flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-5 pb-5"
                  >
                    <p className="text-[#88aa88] text-sm leading-relaxed border-t border-[rgba(0,255,136,0.1)] pt-4">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 glass-card rounded-3xl p-8 md:p-12 text-center border border-[rgba(0,255,136,0.2)]"
        >
          <span className="badge-green mb-4 inline-block">🚀 Ready to Start?</span>
          <h2 className="font-display text-3xl font-bold mb-4">
            Join the <span className="text-gradient">Green Revolution</span>
          </h2>
          <p className="text-[#88aa88] mb-8 max-w-xl mx-auto">
            No credit card needed. Free forever. Start reducing your carbon footprint today
            with 125,000+ eco-warriors worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/challenges">
              <button className="btn-primary flex items-center gap-2 justify-center">
                <Zap className="w-4 h-4" /> Start Free Today
              </button>
            </a>
            <a href="/dashboard">
              <button className="btn-secondary flex items-center gap-2 justify-center">
                <Globe className="w-4 h-4" /> View Dashboard
              </button>
            </a>
          </div>
        </motion.div>
      </div>

      <Footer />
      <AIAssistant />
    </main>
  );
}
