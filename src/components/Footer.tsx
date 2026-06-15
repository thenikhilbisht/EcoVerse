"use client";

import { useState } from "react";
import Link from "next/link";
import { Leaf, Github, Twitter, Linkedin, Instagram, Mail, MapPin, Zap } from "lucide-react";
import { isValidEmail } from "@/lib/utils";

const footerLinks = {
  Platform: [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Challenges", href: "/challenges" },
    { label: "Leaderboard", href: "/leaderboard" },
  ],
  Community: [
    { label: "Forum", href: "/community" },
    { label: "Teams", href: "/community#teams" },
    { label: "Innovation Hub", href: "/innovation" },
    { label: "Events", href: "/community#events" },
  ],
  Resources: [
    { label: "Carbon Calculator", href: "/#calculator" },
    { label: "Eco Tips", href: "/about#tips" },
    { label: "Rewards Shop", href: "/rewards" },
    { label: "AI Assistant", href: "/dashboard#ai" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setStatus("error");
      return;
    }
    setStatus("success");
    setEmail("");
  };

  return (
    <footer className="relative mt-20 border-t border-[rgba(0,255,136,0.1)]">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050a05] to-transparent pointer-events-none" />
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5 group w-fit">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00ff88] to-[#00cc6a] flex items-center justify-center shadow-[0_0_20px_rgba(0,255,136,0.4)]">
                <Leaf className="w-5 h-5 text-[#050a05]" />
              </div>
              <span className="font-display text-xl font-bold">
                <span className="text-gradient">Eco</span>
                <span className="text-[#e8ffe8]">Verse</span>
              </span>
            </Link>
            <p className="text-[#557755] text-sm leading-relaxed mb-6 max-w-xs">
              The world&apos;s most engaging sustainability platform. Track, reduce, compete,
              and save our planet — together.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { label: "Active Warriors", value: "125K+" },
                { label: "CO₂ Saved", value: "45K tons" },
                { label: "Countries", value: "89" },
                { label: "Challenges", value: "500+" },
              ].map((stat) => (
                <div key={stat.label} className="glass-card rounded-xl p-3">
                  <div className="text-gradient font-bold text-lg font-display">{stat.value}</div>
                  <div className="text-[#557755] text-xs">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="flex gap-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  rel="noopener noreferrer"
                  className="w-9 h-9 glass rounded-lg flex items-center justify-center text-[#557755] hover:text-[#00ff88] hover:border-[rgba(0,255,136,0.3)] transition-all duration-200"
                >
                  <social.icon className="w-4 h-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-[#e8ffe8] font-semibold text-sm mb-4 font-display">{category}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[#557755] text-sm hover:text-[#00ff88] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="py-8 border-t border-b border-[rgba(0,255,136,0.08)]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display font-bold text-lg mb-1">
                Stay updated on <span className="text-gradient">Earth&apos;s progress</span>
              </h3>
              <p className="text-[#557755] text-sm">Weekly eco insights, challenge updates & community highlights.</p>
            </div>
            <form className="flex flex-col gap-1 w-full md:w-auto" onSubmit={handleSubscribe} noValidate>
              <div className="flex gap-3 w-full md:w-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="eco-input flex-1 md:w-64"
                  aria-label="Email for newsletter"
                  aria-invalid={status === "error"}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status !== "idle") setStatus("idle");
                  }}
                />
                <button type="submit" className="btn-primary whitespace-nowrap">Subscribe</button>
              </div>
              {status === "error" && (
                <span className="text-xs text-[#f97316]" role="alert">Please enter a valid email address.</span>
              )}
              {status === "success" && (
                <span className="text-xs text-[#00ff88]" role="status">Thanks for subscribing! 🌱</span>
              )}
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-[#557755] text-xs">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3" />
              Planet Earth, Solar System
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3 h-3" />
              hello@ecoverse.earth
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[#557755] text-xs">
            <span>© 2026 EcoVerse. Made with</span>
            <Leaf className="w-3 h-3 text-[#00ff88]" />
            <span>for the planet.</span>
            <span className="mx-2">•</span>
            <Zap className="w-3 h-3 text-[#ffd700]" />
            <span>Carbon neutral infrastructure</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
