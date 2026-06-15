"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Car, Zap, Droplets, Utensils, ShoppingBag, Wifi, ArrowRight, TrendingDown, BarChart3 } from "lucide-react";
import {
  RadialBarChart, RadialBar, ResponsiveContainer, Tooltip
} from "recharts";
import {
  calculateCarbon,
  computeScore,
  getTips,
  DEFAULT_INPUTS,
  GLOBAL_AVG_YEARLY_KG,
} from "@/lib/carbonUtils";

const categories = [
  { id: "transport", label: "Transport", icon: Car, unit: "km/week", max: 500, color: "#00ff88", desc: "Car, flights, public transit" },
  { id: "electricity", label: "Electricity", icon: Zap, unit: "kWh/month", max: 1000, color: "#00d4ff", desc: "Home energy usage" },
  { id: "water", label: "Water", icon: Droplets, unit: "liters/day", max: 500, color: "#60a5fa", desc: "Daily water consumption" },
  { id: "food", label: "Food", icon: Utensils, unit: "meat meals/week", max: 21, color: "#ffd700", desc: "Diet and food habits" },
  { id: "shopping", label: "Shopping", icon: ShoppingBag, unit: "items/month", max: 20, color: "#f97316", desc: "New purchases" },
  { id: "digital", label: "Digital", icon: Wifi, unit: "hours/day", max: 24, color: "#a78bfa", desc: "Streaming & devices" },
];

export default function CarbonCalculator() {
  const [inputs, setInputs] = useState<Record<string, number>>({ ...DEFAULT_INPUTS });
  const [calculated, setCalculated] = useState(false);

  const globalAvg = GLOBAL_AVG_YEARLY_KG;
  const monthlyCarbon = useMemo(() => calculateCarbon(inputs), [inputs]);
  const yearlyCarbon = useMemo(() => monthlyCarbon * 12, [monthlyCarbon]);
  const score = useMemo(() => computeScore(yearlyCarbon), [yearlyCarbon]);

  const chartData = useMemo(
    () => [
      { name: "Your Score", value: score, fill: score > 60 ? "#00ff88" : score > 30 ? "#ffd700" : "#f97316" },
      { name: "Global Avg", value: 45, fill: "rgba(255,255,255,0.1)" },
    ],
    [score],
  );

  const tips = useMemo(() => getTips(inputs, yearlyCarbon), [inputs, yearlyCarbon]);

  return (
    <section id="calculator" className="py-20 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,212,255,0.05)_0%,transparent_70%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="badge-blue mb-4 inline-block">🤖 AI Carbon Calculator</span>
          <h2 className="section-title mb-4">
            Know Your <span className="text-gradient">Carbon Score</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Get your personalized carbon footprint analysis and AI-powered recommendations in seconds.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-6 md:p-8 space-y-6"
          >
            <h3 className="font-display text-lg font-semibold">Your Lifestyle Data</h3>
            {categories.map((cat) => (
              <div key={cat.id}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: `${cat.color}20`, border: `1px solid ${cat.color}30` }}>
                      <cat.icon className="w-4 h-4" style={{ color: cat.color }} />
                    </div>
                    <div>
                      <label htmlFor={`slider-${cat.id}`} className="text-sm font-medium">{cat.label}</label>
                      <span className="text-[#557755] text-xs ml-2">{cat.desc}</span>
                    </div>
                  </div>
                  <span className="text-sm font-mono" style={{ color: cat.color }}>
                    {inputs[cat.id]} {cat.unit.split("/")[0]}
                  </span>
                </div>
                <input
                  id={`slider-${cat.id}`}
                  type="range"
                  min={0}
                  max={cat.max}
                  value={inputs[cat.id]}
                  onChange={(e) => setInputs(prev => ({ ...prev, [cat.id]: Number(e.target.value) }))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, ${cat.color} ${(inputs[cat.id] / cat.max) * 100}%, rgba(255,255,255,0.1) 0%)`,
                    accentColor: cat.color,
                  }}
                  aria-valuetext={`${inputs[cat.id]} ${cat.unit}`}
                />
                <div className="flex justify-between text-[#557755] text-xs mt-1">
                  <span>0</span><span>{cat.unit}</span><span>{cat.max}</span>
                </div>
              </div>
            ))}
            <button
              id="btn-calculate"
              className="btn-primary w-full flex items-center justify-center gap-2"
              onClick={() => setCalculated(true)}
            >
              <BarChart3 className="w-4 h-4" />
              Calculate My Carbon Score
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            {!calculated ? (
              <div className="glass-card rounded-2xl p-10 text-center flex flex-col items-center justify-center min-h-[320px]">
                <BarChart3 className="w-10 h-10 text-[#00ff88] mb-4" aria-hidden="true" />
                <h3 className="font-display font-semibold mb-2">See Your Carbon Score</h3>
                <p className="text-[#557755] text-sm max-w-xs">
                  Adjust your lifestyle data, then click{" "}
                  <span className="text-[#00ff88]">Calculate My Carbon Score</span> to reveal your
                  personalized footprint analysis.
                </p>
              </div>
            ) : (
              <>
            {/* Score */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-display font-semibold mb-4">Carbon Score</h3>
              <div className="flex items-center gap-6">
                <div
                  className="w-32 h-32"
                  role="progressbar"
                  aria-label="Carbon score out of 100"
                  aria-valuenow={score}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="100%" data={chartData} startAngle={90} endAngle={-270}>
                      <RadialBar dataKey="value" cornerRadius={10} />
                    </RadialBarChart>
                  </ResponsiveContainer>
                </div>
                <motion.div key={score} initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", damping: 12 }}>
                  <div className="text-5xl font-display font-bold text-gradient">{score}</div>
                  <div className="text-[#557755] text-sm">out of 100</div>
                  <div className="mt-2 badge-green">{score > 70 ? "Eco Hero 🌿" : score > 40 ? "Improving 📈" : "Needs Work ⚡"}</div>
                </motion.div>
              </div>
            </div>

            {/* Emissions breakdown */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-display font-semibold mb-4">Monthly Emissions</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="stat-card">
                  <div className="text-2xl font-bold text-gradient font-display">{Math.round(monthlyCarbon)} kg</div>
                  <div className="text-[#557755] text-xs mt-1">Your monthly CO₂</div>
                </div>
                <div className="stat-card">
                  <div className="text-2xl font-bold text-[#00d4ff] font-display">{Math.round(yearlyCarbon / 1000 * 10) / 10}t</div>
                  <div className="text-[#557755] text-xs mt-1">Yearly total</div>
                </div>
                <div className="stat-card">
                  <div className="text-2xl font-bold text-[#ffd700] font-display">{globalAvg / 1000}t</div>
                  <div className="text-[#557755] text-xs mt-1">Global average</div>
                </div>
                <div className="stat-card">
                  <div className="text-2xl font-bold font-display" style={{ color: yearlyCarbon < globalAvg ? "#00ff88" : "#f97316" }}>
                    {yearlyCarbon < globalAvg ? "−" : "+"}{Math.round(Math.abs(yearlyCarbon - globalAvg) / 100) / 10}t
                  </div>
                  <div className="text-[#557755] text-xs mt-1">vs global avg</div>
                </div>
              </div>
            </div>

            {/* AI Tips */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-[#00ff88]" /> AI Recommendations
              </h3>
              <div className="space-y-3">
                {tips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-[rgba(0,255,136,0.05)] border border-[rgba(0,255,136,0.1)]">
                    <span className="text-[#00ff88] font-bold text-sm mt-0.5">0{i + 1}</span>
                    <p className="text-[#88aa88] text-sm">{tip as string}</p>
                  </div>
                ))}
              </div>
            </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
