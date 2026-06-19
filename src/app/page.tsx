import { ArrowRight, Cpu, Globe2, Users2, Rocket, TreePine, Droplets, Zap } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import { CarbonExplainer } from "@/components/CarbonExplainer";
import CarbonCalculator from "@/components/CarbonCalculator";
import type { Metadata } from "next";

const ChallengesSection = dynamic(() => import("@/components/ChallengesSection"));
const LeaderboardSection = dynamic(() => import("@/components/LeaderboardSection"));
const AIAssistant = dynamic(() => import("@/components/AIAssistant"));

export const metadata: Metadata = {
  title: "EcoVerse — Understand. Track. Reduce.",
  description:
    "Join EcoVerse — calculate your carbon footprint, get personalised reduction strategies, and stay motivated with gamified challenges.",
};

const features = [
  {
    icon: Cpu,
    title: "AI Carbon Tracking",
    desc: "Real-time AI analysis of your lifestyle to calculate and predict carbon emissions with personalised reduction strategies.",
    color: "#00ff88",
    href: "/#calculator",
  },
  {
    icon: Zap,
    title: "Gamified Challenges",
    desc: "Daily eco missions, streak rewards, XP points, and achievement badges to keep you motivated and engaged.",
    color: "#00d4ff",
    href: "/challenges",
  },
  {
    icon: Globe2,
    title: "Global Competition",
    desc: "Compete with eco-warriors worldwide. Weekly tournaments, team battles, and country leaderboards.",
    color: "#ffd700",
    href: "/leaderboard",
  },
  {
    icon: Users2,
    title: "Community Power",
    desc: "Share achievements, form teams, and collaborate on sustainability projects with people worldwide.",
    color: "#f97316",
    href: "/community",
  },
  {
    icon: TreePine,
    title: "Impact Dashboard",
    desc: "Beautiful real-time dashboard showing trees saved, CO₂ reduced, and your contribution to a healthier planet.",
    color: "#00ff88",
    href: "/dashboard",
  },
  {
    icon: Rocket,
    title: "Innovation Hub",
    desc: "Submit climate-tech startup ideas, participate in competitions, and connect with mentors and investors.",
    color: "#a78bfa",
    href: "/innovation",
  },
];

const impactStats = [
  { icon: TreePine, value: "38,420", label: "Trees Planted",  color: "#00ff88" },
  { icon: Droplets, value: "2.4M L",  label: "Water Saved",    color: "#00d4ff" },
  { icon: Zap,      value: "890 MWh", label: "Energy Saved",   color: "#ffd700" },
  { icon: Globe2,   value: "45K ton", label: "CO₂ Reduced",    color: "#f97316" },
];

const testimonials = [
  {
    name: "Arjun Sharma",
    country: "🇮🇳",
    countryLabel: "India",
    role: "Climate Hero",
    text: "EcoVerse completely changed how I think about my daily choices. Reduced my carbon footprint by 40% in 3 months!",
    xp: "48K XP",
  },
  {
    name: "Emma Wilson",
    country: "🇬🇧",
    countryLabel: "United Kingdom",
    role: "Earth Guardian",
    text: "The gamification is addictive in the best way. I look forward to my daily eco challenges every morning.",
    xp: "45K XP",
  },
  {
    name: "Yuki Tanaka",
    country: "🇯🇵",
    countryLabel: "Japan",
    role: "Climate Hero",
    text: "The AI recommendations are incredibly accurate and actionable. Best sustainability app I've ever used.",
    xp: "38K XP",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-eco-black overflow-x-hidden">
      <Navbar />
      <HeroSection />

      {/* Carbon Explainer (Understand) */}
      <CarbonExplainer />

      {/* Carbon Calculator (Track & Reduce) */}
      <CarbonCalculator />

      {/* Features Section */}
      <section className="py-20 relative" aria-labelledby="features-heading">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,255,136,0.06)_0%,transparent_70%)]" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-14">
            <span className="badge-green mb-4 inline-block">✨ Platform Features</span>
            <h2 id="features-heading" className="section-title mb-4">
              Everything You Need to <span className="text-gradient">Go Green</span>
            </h2>
            <p className="section-subtitle mx-auto">
              A complete sustainability ecosystem powered by AI, gamification, and community-driven impact.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <Link
                key={f.title}
                href={f.href}
                className="glass-card rounded-2xl p-6 group hover:scale-[1.02] transition-all duration-300 neon-border-hover border border-[rgba(0,255,136,0.08)] block"
                aria-label={`${f.title} — ${f.desc}`}
              >
                <div
                  className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center"
                  style={{ background: `${f.color}15`, border: `1px solid ${f.color}30` }}
                  aria-hidden="true"
                >
                  <f.icon className="w-6 h-6" style={{ color: f.color }} />
                </div>
                <h3 className="font-display font-semibold text-base mb-2">{f.title}</h3>
                <p className="text-[#88aa88] text-sm leading-relaxed">{f.desc}</p>
                <div
                  className="mt-4 flex items-center gap-1 text-xs font-medium transition-colors"
                  style={{ color: f.color }}
                  aria-hidden="true"
                >
                  Learn more <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Real Impact Stats */}
      <section className="py-16 relative" aria-labelledby="impact-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-3xl p-8 md:p-12 border border-[rgba(0,255,136,0.15)]">
            <div className="text-center mb-10">
              <span className="badge-green mb-3 inline-block">🌍 Real World Impact</span>
              <h2 id="impact-heading" className="section-title">
                Our Community Has <span className="text-gradient">Already Saved</span>
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {impactStats.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-5 rounded-2xl"
                  style={{ background: `${stat.color}08`, border: `1px solid ${stat.color}20` }}
                >
                  <stat.icon
                    className="w-8 h-8 mx-auto mb-3"
                    style={{ color: stat.color }}
                    aria-hidden="true"
                  />
                  <div
                    className="text-3xl font-display font-bold mb-1"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-[#88aa88] text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Challenges Section - Gamification as a habit mechanism */}
      <div className="relative pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
          <span className="badge-blue mb-4 inline-block">🎮 Gamified Habit Building</span>
          <h2 className="section-title mb-4">
            Stay Motivated with <span className="text-gradient-warm">XP & Challenges</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Reducing your footprint is easier when it&apos;s fun. Earn XP, maintain your streak, and unlock ranks as you build greener habits.
          </p>
        </div>
        <ChallengesSection />
      </div>

      {/* Leaderboard Section */}
      <LeaderboardSection />

      {/* Testimonials */}
      <section className="py-20 relative" aria-labelledby="testimonials-heading">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,255,136,0.04)_0%,transparent_70%)]" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <span className="badge-blue mb-4 inline-block">💬 Community Stories</span>
            <h2 id="testimonials-heading" className="section-title">
              Warriors <span className="text-gradient">Changing the World</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <article
                key={t.name}
                className="glass-card rounded-2xl p-6"
                aria-label={`Testimonial from ${t.name}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00ff88] to-[#00cc6a] flex items-center justify-center text-sm font-bold text-[#050a05]"
                    aria-hidden="true"
                  >
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">
                      {t.name}{" "}
                      <span
                        role="img"
                        aria-label={t.countryLabel}
                      >
                        {t.country}
                      </span>
                    </div>
                    <div className="text-[#00ff88] text-xs">
                      {t.role} • {t.xp}
                    </div>
                  </div>
                </div>
                <blockquote>
                  <p className="text-[#88aa88] text-sm leading-relaxed italic">
                    &ldquo;{t.text}&rdquo;
                  </p>
                </blockquote>
                <div
                  className="flex gap-1 mt-4"
                  aria-label="5 out of 5 stars"
                  role="img"
                >
                  {[...Array(5)].map((_, s) => (
                    <span key={s} className="text-[#ffd700] text-sm" aria-hidden="true">
                      ★
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative" aria-labelledby="cta-heading">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,255,136,0.12)_0%,transparent_70%)]" aria-hidden="true" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <span className="badge-green mb-6 inline-block">🚀 Join the Movement</span>
          <h2 id="cta-heading" className="section-title mb-6">
            The Earth Needs You. <br />
            <span className="text-gradient">Start Today.</span>
          </h2>
          <p className="section-subtitle mx-auto mb-10">
            Join 125,000+ warriors making a real difference. Your journey to a greener lifestyle starts with understanding your footprint.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#calculator"
              id="cta-join-now"
              className="btn-primary flex items-center gap-2 justify-center w-full sm:w-auto"
            >
              <Zap className="w-4 h-4" aria-hidden="true" />
              Calculate My Carbon Score
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              href="/challenges"
              className="btn-secondary flex items-center gap-2 justify-center w-full sm:w-auto"
            >
              <Globe2 className="w-4 h-4" aria-hidden="true" />
              View Challenges
            </Link>
          </div>
          <p className="text-[#88aa88] text-xs mt-6">Free forever • No credit card • Instant access</p>
        </div>
      </section>

      <Footer />
      <AIAssistant />
    </main>
  );
}
