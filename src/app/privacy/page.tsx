import { Leaf } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — EcoVerse",
  description: "EcoVerse Privacy Policy — how we collect, use, and protect your data.",
};

const sections = [
  {
    title: "1. Information We Collect",
    content: `We collect information you provide directly to us, such as:
• Account registration data (name, email, password)
• Profile information (country, preferences, avatar)
• Usage data (challenges completed, carbon calculator inputs, community posts)
• Device information (browser type, IP address, operating system)

We do NOT collect sensitive financial information. All payment processing is handled by certified third-party processors.`,
  },
  {
    title: "2. How We Use Your Information",
    content: `We use collected information to:
• Provide, maintain, and improve the EcoVerse platform
• Personalize your sustainability journey and AI recommendations
• Calculate and track your carbon footprint metrics
• Send notifications about challenges, achievements, and platform updates
• Generate anonymized, aggregated environmental impact statistics
• Respond to your support requests and inquiries`,
  },
  {
    title: "3. Data Sharing & Disclosure",
    content: `We do not sell, trade, or rent your personal information to third parties.

We may share anonymized, aggregated data for:
• Environmental research and climate science publications
• Platform analytics and performance improvements
• Public leaderboards (only username and XP, never email)

We may disclose data if required by law, court order, or to protect platform integrity.`,
  },
  {
    title: "4. Data Security",
    content: `We implement industry-standard security measures including:
• AES-256 encryption for data at rest
• TLS 1.3 encryption for data in transit
• Regular security audits and penetration testing
• SOC 2 Type II compliance
• Multi-factor authentication support

No method of transmission over the internet is 100% secure. We strive to protect your data but cannot guarantee absolute security.`,
  },
  {
    title: "5. Cookies & Tracking",
    content: `We use cookies and similar technologies to:
• Keep you logged in across sessions
• Remember your preferences and settings
• Analyze platform usage patterns (using privacy-respecting analytics)
• Provide personalized challenge recommendations

You can control cookie settings through your browser. Disabling cookies may affect some platform features.`,
  },
  {
    title: "6. Your Rights",
    content: `Depending on your location, you have the right to:
• Access your personal data we hold
• Correct inaccurate personal data
• Delete your account and all associated data
• Export your data in machine-readable format
• Opt out of marketing communications
• Lodge a complaint with your local data protection authority

To exercise any of these rights, contact us at privacy@ecoverse.earth`,
  },
  {
    title: "7. Data Retention",
    content: `We retain your personal data for as long as your account is active or as needed to provide services. If you delete your account:
• Account data is deleted within 30 days
• Anonymized usage statistics may be retained for research purposes
• Legal compliance records are retained per applicable laws (typically 7 years)`,
  },
  {
    title: "8. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. We will notify you of significant changes via:
• Email notification to your registered address
• In-app notification on your next login
• Updated "Last Modified" date at the top of this page

Continued use of EcoVerse after changes constitutes acceptance of the updated policy.`,
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-eco-black">
      {/* Background */}
      <div className="fixed inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(0,255,136,0.06)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
        {/* Header */}
        <div className="mb-10 pt-12">
          <Link href="/" className="flex items-center gap-2 mb-8 w-fit">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#00ff88] to-[#00cc6a] flex items-center justify-center">
              <Leaf className="w-4 h-4 text-[#050a05]" />
            </div>
            <span className="font-display font-bold">
              <span className="text-gradient">Eco</span>
              <span className="text-[#e8ffe8]">Verse</span>
            </span>
          </Link>
          <span className="badge-green mb-4 inline-block">🔒 Legal</span>
          <h1 className="section-title mb-3">Privacy Policy</h1>
          <p className="text-[#88aa88] text-sm">
            Last updated: June 1, 2026 · Effective: June 1, 2026
          </p>
          <p className="text-[#88aa88] mt-4 leading-relaxed">
            At EcoVerse, we take your privacy seriously. This policy explains how we collect,
            use, and protect your personal information when you use our sustainability platform.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, i) => (
            <div key={i} className="glass-card rounded-2xl p-6">
              <h2 className="font-display font-semibold text-[#e8ffe8] mb-3 text-lg">{section.title}</h2>
              <p className="text-[#88aa88] text-sm leading-relaxed whitespace-pre-line">{section.content}</p>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="mt-8 glass-card rounded-2xl p-6 border border-[rgba(0,255,136,0.2)]">
          <h2 className="font-display font-semibold mb-3">Questions About Privacy?</h2>
          <p className="text-[#88aa88] text-sm mb-4">
            Contact our dedicated Privacy Team for any questions or concerns:
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-[#88aa88]">
              <span className="text-[#00ff88]">Email:</span> privacy@ecoverse.earth
            </div>
            <div className="flex items-center gap-2 text-[#88aa88]">
              <span className="text-[#00ff88]">Address:</span> 101 Green St, San Francisco, CA 94102
            </div>
            <div className="flex items-center gap-2 text-[#88aa88]">
              <span className="text-[#00ff88]">DPO:</span> data-protection@ecoverse.earth
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-[#00ff88] text-sm hover:underline">← Back to EcoVerse</Link>
          <span className="text-[#557755] mx-3">·</span>
          <Link href="/contact" className="text-[#557755] text-sm hover:text-[#00ff88] transition-colors">Contact Us</Link>
          <span className="text-[#557755] mx-3">·</span>
          <Link href="/terms" className="text-[#557755] text-sm hover:text-[#00ff88] transition-colors">Terms of Service</Link>
        </div>
      </div>
    </main>
  );
}
