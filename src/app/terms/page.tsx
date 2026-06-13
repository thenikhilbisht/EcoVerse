import { Leaf } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Terms of Service — EcoVerse",
  description: "EcoVerse Terms of Service — the rules and guidelines for using our platform.",
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: `By accessing or using EcoVerse ("the Platform"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the Platform.

These Terms apply to all users, including visitors, registered members, challenge participants, and team leaders.`,
  },
  {
    title: "2. Eligibility",
    content: `To use EcoVerse, you must:
• Be at least 13 years of age (or the minimum age in your country)
• Have the legal capacity to enter into a binding agreement
• Not have been previously banned or suspended from the Platform

Users under 18 must have parental or guardian consent to participate in any paid features or real-world reward redemptions.`,
  },
  {
    title: "3. Account Responsibilities",
    content: `You are responsible for:
• Maintaining the security of your account credentials
• All activity that occurs under your account
• Providing accurate and current information
• Notifying us immediately of any unauthorized account access

You may not create multiple accounts, impersonate others, or transfer your account to another person without written consent from EcoVerse.`,
  },
  {
    title: "4. Eco Coins & Rewards",
    content: `Eco Coins are virtual currency earned through platform participation. Important terms:
• Eco Coins have no real-world monetary value and cannot be exchanged for cash
• Eco Coins expire after 12 months of account inactivity
• EcoVerse reserves the right to modify Eco Coin earning rates and redemption values
• Real-world rewards (tree planting, carbon offsets) are fulfilled by verified third-party partners
• Fraudulent earning of Eco Coins will result in immediate account suspension`,
  },
  {
    title: "5. Community Guidelines",
    content: `Users must not post content that:
• Is false, misleading, or misrepresents environmental claims
• Is harassing, discriminatory, or threatening
• Contains spam, commercial advertising, or affiliate links
• Infringes on intellectual property rights
• Violates any applicable laws or regulations

Violations may result in content removal, account suspension, or permanent ban at EcoVerse's sole discretion.`,
  },
  {
    title: "6. Carbon Data Accuracy",
    content: `The carbon calculator and tracking features provide estimates based on:
• IPCC-certified emission factors
• Regional energy grid data (updated quarterly)
• User-provided lifestyle inputs

These are estimates and should not be used as the sole basis for official carbon reporting, auditing, or regulatory compliance. EcoVerse makes no warranties about the accuracy of carbon calculations.`,
  },
  {
    title: "7. Intellectual Property",
    content: `All Platform content, including but not limited to logos, design, code, challenge descriptions, and AI-generated recommendations, is owned by EcoVerse Inc. and protected by copyright law.

User-generated content (posts, comments, submitted challenges) remains your property, but you grant EcoVerse a worldwide, royalty-free license to use, display, and distribute this content on the Platform.`,
  },
  {
    title: "8. Limitation of Liability",
    content: `EcoVerse is provided "as is" without warranties of any kind. To the maximum extent permitted by law, EcoVerse shall not be liable for:
• Indirect, incidental, or consequential damages
• Loss of data or profits
• Interruption of service
• Inaccuracies in environmental data or carbon calculations

Our total liability to you for any claims arising from these Terms shall not exceed $100 USD or the amount you paid to EcoVerse in the past 12 months, whichever is greater.`,
  },
  {
    title: "9. Termination",
    content: `Either party may terminate the user relationship at any time:
• You may delete your account at any time through account settings
• We may suspend or terminate accounts that violate these Terms without notice
• Upon termination, your access to premium features and Eco Coins will cease
• Provisions that by their nature should survive termination will remain in effect`,
  },
  {
    title: "10. Governing Law",
    content: `These Terms are governed by the laws of the State of California, United States, without regard to conflict of law principles.

Any disputes shall be resolved through binding arbitration in San Francisco, CA, except that either party may seek injunctive relief in any court of competent jurisdiction.`,
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-eco-black">
      {/* Background */}
      <div className="fixed inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(0,212,255,0.05)_0%,transparent_60%)] pointer-events-none" />

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
          <span className="badge-blue mb-4 inline-block">📜 Legal</span>
          <h1 className="section-title mb-3">Terms of Service</h1>
          <p className="text-[#88aa88] text-sm">
            Last updated: June 1, 2026 · Effective: June 1, 2026
          </p>
          <p className="text-[#88aa88] mt-4 leading-relaxed">
            Please read these Terms of Service carefully before using EcoVerse. By using our
            platform, you agree to be bound by these terms.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-5">
          {sections.map((section, i) => (
            <div key={i} className="glass-card rounded-2xl p-6">
              <h2 className="font-display font-semibold text-[#e8ffe8] mb-3 text-lg">{section.title}</h2>
              <p className="text-[#88aa88] text-sm leading-relaxed whitespace-pre-line">{section.content}</p>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="mt-8 glass-card rounded-2xl p-6 border border-[rgba(0,212,255,0.2)]">
          <h2 className="font-display font-semibold mb-3">Questions About Our Terms?</h2>
          <p className="text-[#88aa88] text-sm mb-4">
            Contact our Legal Team for any questions or concerns about these Terms:
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-[#88aa88]">
              <span className="text-[#00ff88]">Email:</span> legal@ecoverse.earth
            </div>
            <div className="flex items-center gap-2 text-[#88aa88]">
              <span className="text-[#00ff88]">Address:</span> 101 Green St, San Francisco, CA 94102
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-[#00ff88] text-sm hover:underline">← Back to EcoVerse</Link>
          <span className="text-[#557755] mx-3">·</span>
          <Link href="/contact" className="text-[#557755] text-sm hover:text-[#00ff88] transition-colors">Contact Us</Link>
          <span className="text-[#557755] mx-3">·</span>
          <Link href="/privacy" className="text-[#557755] text-sm hover:text-[#00ff88] transition-colors">Privacy Policy</Link>
        </div>
      </div>
    </main>
  );
}
