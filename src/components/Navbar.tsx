"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Leaf, Home, LayoutDashboard, Trophy, Users, Lightbulb, Gift,
  Info, Menu, X, Zap, User, Bell, ChevronDown,
} from "lucide-react";

const navLinks = [
  { href: "/",            label: "Home",        icon: Home },
  { href: "/dashboard",  label: "Dashboard",   icon: LayoutDashboard },
  { href: "/challenges", label: "Challenges",  icon: Zap },
  { href: "/leaderboard",label: "Leaderboard", icon: Trophy },
  { href: "/community",  label: "Community",   icon: Users },
  { href: "/innovation", label: "Innovation",  icon: Lightbulb },
  { href: "/rewards",    label: "Rewards",     icon: Gift },
  { href: "/about",      label: "About",       icon: Info },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setMoreOpen(false);
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    const timer = setTimeout(() => {
      setMenuOpen(false);
      setMoreOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass-dark border-b border-[rgba(0,255,136,0.1)] py-3"
            : "bg-transparent py-5"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group" aria-label="EcoVerse home">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00ff88] to-[#00cc6a] flex items-center justify-center shadow-[0_0_20px_rgba(0,255,136,0.5)] group-hover:shadow-[0_0_30px_rgba(0,255,136,0.8)] transition-all duration-300">
                  <Leaf className="w-5 h-5 text-[#050a05]" aria-hidden="true" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#00d4ff] rounded-full border-2 border-[#050a05] pulse-dot" aria-hidden="true" />
              </div>
              <span className="font-display font-700 text-xl tracking-tight">
                <span className="text-gradient">Eco</span>
                <span className="text-[#e8ffe8]">Verse</span>
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1" role="list">
              {navLinks.slice(0, 6).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  role="listitem"
                  className={`nav-link px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    pathname === link.href
                      ? "text-[#00ff88] bg-[rgba(0,255,136,0.08)]"
                      : "text-[#88aa88] hover:text-[#e8ffe8] hover:bg-[rgba(255,255,255,0.04)]"
                  }`}
                  aria-current={pathname === link.href ? "page" : undefined}
                >
                  {link.label}
                </Link>
              ))}

              {/* "More" dropdown */}
              <div className="relative">
                <button
                  className="nav-link px-3 py-2 rounded-lg text-sm font-medium text-[#88aa88] hover:text-[#e8ffe8] hover:bg-[rgba(255,255,255,0.04)] flex items-center gap-1"
                  aria-haspopup="true"
                  aria-expanded={moreOpen}
                  aria-controls="more-dropdown"
                  onClick={() => setMoreOpen((prev) => !prev)}
                  onBlur={(e) => {
                    // Close if focus leaves the dropdown entirely
                    if (!e.currentTarget.parentElement?.contains(e.relatedTarget as Node)) {
                      setMoreOpen(false);
                    }
                  }}
                >
                  More <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
                <AnimatePresence>
                  {moreOpen && (
                    <motion.div
                      id="more-dropdown"
                      role="menu"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full right-0 mt-2 w-48 glass-card rounded-xl overflow-hidden py-1"
                    >
                      {navLinks.slice(6).map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          role="menuitem"
                          onClick={() => setMoreOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#88aa88] hover:text-[#00ff88] hover:bg-[rgba(0,255,136,0.08)] transition-colors"
                          aria-current={pathname === link.href ? "page" : undefined}
                        >
                          <link.icon className="w-4 h-4" aria-hidden="true" />
                          {link.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                className="relative w-9 h-9 rounded-xl glass flex items-center justify-center text-[#88aa88] hover:text-[#00ff88] transition-colors"
                aria-label="Notifications (1 unread)"
              >
                <Bell className="w-4 h-4" aria-hidden="true" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#00ff88] rounded-full" aria-hidden="true" />
              </button>

              <div className="flex items-center gap-1.5 px-3 py-1.5 glass rounded-xl" aria-label="Your XP: 2,450">
                <Zap className="w-3.5 h-3.5 text-[#ffd700]" aria-hidden="true" />
                <span className="text-xs font-semibold text-[#ffd700]">2,450 XP</span>
              </div>

              <Link href="/profile" aria-label="Go to profile">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00ff88] to-[#00cc6a] flex items-center justify-center shadow-[0_0_15px_rgba(0,255,136,0.4)] hover:shadow-[0_0_25px_rgba(0,255,136,0.6)] transition-all cursor-pointer">
                  <User className="w-4 h-4 text-[#050a05]" aria-hidden="true" />
                </div>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden w-10 h-10 rounded-xl glass flex items-center justify-center text-[#88aa88] hover:text-[#00ff88] transition-colors"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation-menu"
            >
              {menuOpen
                ? <X className="w-5 h-5" aria-hidden="true" />
                : <Menu className="w-5 h-5" aria-hidden="true" />
              }
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-navigation-menu"
            role="dialog"
            aria-label="Navigation menu"
            aria-modal="true"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="mobile-menu flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-[rgba(0,255,136,0.1)]">
              <Link href="/" className="flex items-center gap-2.5" onClick={closeMenu} aria-label="EcoVerse home">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00ff88] to-[#00cc6a] flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-[#050a05]" aria-hidden="true" />
                </div>
                <span className="font-display text-xl font-bold">
                  <span className="text-gradient">Eco</span>
                  <span className="text-[#e8ffe8]">Verse</span>
                </span>
              </Link>
              <button
                className="w-10 h-10 rounded-xl glass flex items-center justify-center text-[#88aa88] hover:text-[#00ff88] transition-colors"
                onClick={closeMenu}
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* XP Bar */}
            <div className="mx-6 mt-5 p-4 glass-card rounded-2xl" aria-label="User profile summary">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00ff88] to-[#00cc6a] flex items-center justify-center" aria-hidden="true">
                  <User className="w-5 h-5 text-[#050a05]" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Eco Warrior</div>
                  <div className="text-xs text-[#88aa88]">Level 12 • 2,450 XP</div>
                </div>
              </div>
              <div
                className="progress-bar h-2"
                role="progressbar"
                aria-valuenow={72}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Progress to next level: 72%"
              >
                <div className="progress-fill" style={{ width: "72%" }} />
              </div>
              <div className="text-xs text-[#557755] mt-1.5">550 XP to next level</div>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 overflow-y-auto px-6 py-4 space-y-1" aria-label="Mobile navigation">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl transition-all ${
                      pathname === link.href
                        ? "bg-[rgba(0,255,136,0.12)] text-[#00ff88] border border-[rgba(0,255,136,0.2)]"
                        : "text-[#88aa88] hover:bg-[rgba(255,255,255,0.04)] hover:text-[#e8ffe8]"
                    }`}
                    onClick={closeMenu}
                    aria-current={pathname === link.href ? "page" : undefined}
                  >
                    <link.icon className="w-5 h-5" aria-hidden="true" />
                    <span className="font-medium">{link.label}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom Actions */}
            <div className="px-6 pb-8 pt-4 border-t border-[rgba(0,255,136,0.1)] flex gap-3">
              <Link href="/dashboard" className="flex-1" onClick={closeMenu}>
                <span className="btn-primary w-full text-center block">Open Dashboard</span>
              </Link>
              <Link href="/challenges" onClick={closeMenu}>
                <span className="btn-secondary px-4">Join Challenge</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
