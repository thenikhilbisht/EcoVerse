import Link from "next/link";
import { Leaf, ArrowLeft, Globe } from "lucide-react";

export const metadata = {
  title: "Page Not Found — EcoVerse",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-eco-black flex items-center justify-center px-4">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,255,136,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 text-center max-w-lg">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-12">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00ff88] to-[#00cc6a] flex items-center justify-center shadow-[0_0_25px_rgba(0,255,136,0.5)]">
            <Leaf className="w-5 h-5 text-[#050a05]" />
          </div>
          <span className="font-display text-xl font-bold">
            <span className="text-gradient">Eco</span>
            <span className="text-[#e8ffe8]">Verse</span>
          </span>
        </div>

        {/* Giant 404 */}
        <div className="relative mb-6">
          <div className="font-display text-[10rem] font-black leading-none text-gradient opacity-20 select-none absolute inset-0 flex items-center justify-center">
            404
          </div>
          <div className="font-display text-[8rem] font-black leading-none text-gradient select-none">
            404
          </div>
        </div>

        <div className="text-2xl font-display font-bold text-[#e8ffe8] mb-3">
          Lost in the Eco-system? 🌿
        </div>
        <p className="text-[#88aa88] mb-10 leading-relaxed">
          The page you&apos;re looking for has gone off-grid. It may have been
          moved, deleted, or perhaps it&apos;s composting somewhere.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary flex items-center gap-2 justify-center">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <Link href="/challenges" className="btn-secondary flex items-center gap-2 justify-center">
            <Globe className="w-4 h-4" /> View Challenges
          </Link>
        </div>

        <p className="text-[#557755] text-xs mt-8">
          Error 404 · EcoVerse · Making the world greener, one page at a time 🌱
        </p>
      </div>
    </main>
  );
}
