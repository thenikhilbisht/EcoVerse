"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Car, Zap, Droplets, Utensils, ShoppingBag, Wifi, ArrowRight, TrendingDown, BarChart3, History } from "lucide-react";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";
import {
  DEFAULT_INPUTS,
  computeCarbonResult,
  GLOBAL_AVG_YEARLY_KG,
  getScoreLabel,
  type CarbonInputs,
} from "@/lib/carbonUtils";
import { generateRecommendations } from "@/lib/recommendationEngine";
import { saveCalculation } from "@/lib/historyStore";
import { SLIDER_CONFIGS, SLIDER_DEBOUNCE_MS } from "@/lib/constants";

// Map category IDs to icons
const ICONS = {
  transport: Car,
  electricity: Zap,
  water: Droplets,
  food: Utensils,
  shopping: ShoppingBag,
  digital: Wifi,
} as const;

export default function CarbonCalculator() {
  const [sliderValues, setSliderValues] = useState<CarbonInputs>(DEFAULT_INPUTS);
  const [debouncedInputs, setDebouncedInputs] = useState<CarbonInputs>(DEFAULT_INPUTS);
  const [calculated, setCalculated] = useState(false);

  // Debounce slider values
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInputs(sliderValues);
    }, SLIDER_DEBOUNCE_MS);
    return () => clearTimeout(handler);
  }, [sliderValues]);

  const result = useMemo(
    () => computeCarbonResult(debouncedInputs),
    [debouncedInputs]
  );
  const { monthlyKg, yearlyKg, score, vsGlobalAvg } = result;

  const recommendations = useMemo(
    () => generateRecommendations(debouncedInputs, 4),
    [debouncedInputs]
  );

  const chartData = useMemo(
    () => [
      { name: "Your Score", value: score, fill: score > 60 ? "#00ff88" : score > 30 ? "#ffd700" : "#f97316" },
      { name: "Global Avg", value: 45, fill: "rgba(255,255,255,0.1)" },
    ],
    [score]
  );

  const hasCalculatedRef = useRef(false);

  const handleCalculate = () => {
    setCalculated(true);
    // Only save history when explicitly clicking calculate, or perhaps periodically?
    // Let's save on click. If they click again after tweaking, save again.
    saveCalculation(debouncedInputs, result);
    hasCalculatedRef.current = true;
  };

  // If the user already calculated, and they tweak sliders, we could auto-save,
  // but let's only do it on explicit Calculate click to avoid spamming history.

  return (
    <section id="calculator" className="py-20 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,212,255,0.05)_0%,transparent_70%)]" aria-hidden="true" />
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
            Get your personalised carbon footprint analysis and recommendations in seconds.
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
            <h3 className="font-display text-lg font-semibold" id="lifestyle-inputs-heading">
              Your Lifestyle Data
            </h3>
            <fieldset aria-labelledby="lifestyle-inputs-heading" className="space-y-6 border-0 p-0 m-0">
              <legend className="sr-only">Adjust the sliders to match your lifestyle habits</legend>
              {SLIDER_CONFIGS.map((cat) => {
                const val = sliderValues[cat.id];
                const pct = (val / cat.max) * 100;
                const Icon = ICONS[cat.id];
                return (
                  <div key={cat.id}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ background: `${cat.color}20`, border: `1px solid ${cat.color}30` }}
                          aria-hidden="true"
                        >
                          <Icon className="w-4 h-4" style={{ color: cat.color }} />
                        </div>
                        <div>
                          <span className="text-sm font-medium">{cat.label}</span>
                          <span className="text-[#6b9a6b] text-xs ml-2">{cat.description}</span>
                        </div>
                      </div>
                      <span className="text-sm font-mono" style={{ color: cat.color }} aria-hidden="true">
                        {val} {cat.unit.split("/")[0]}
                      </span>
                    </div>
                    <label htmlFor={`slider-${cat.id}`} className="sr-only">
                      {cat.label}: {val} {cat.unit}
                    </label>
                    <input
                      id={`slider-${cat.id}`}
                      type="range"
                      min={0}
                      max={cat.max}
                      value={val}
                      onChange={(e) =>
                        setSliderValues((prev) => ({ ...prev, [cat.id]: Number(e.target.value) }))
                      }
                      className="w-full h-2 rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, ${cat.color} ${pct}%, rgba(255,255,255,0.1) 0%)`,
                        accentColor: cat.color,
                      }}
                      aria-valuenow={val}
                      aria-valuemin={0}
                      aria-valuemax={cat.max}
                      aria-label={`${cat.label}: ${val} ${cat.unit}`}
                    />
                    <div className="flex justify-between text-[#6b9a6b] text-xs mt-1" aria-hidden="true">
                      <span>0</span>
                      <span>{cat.unit}</span>
                      <span>{cat.max}</span>
                    </div>
                  </div>
                );
              })}
            </fieldset>

            <button
              id="btn-calculate"
              className="btn-primary w-full flex items-center justify-center gap-2"
              onClick={handleCalculate}
              aria-describedby="calc-hint"
            >
              <BarChart3 className="w-4 h-4" aria-hidden="true" />
              {calculated ? "Update My Carbon Score" : "Calculate My Carbon Score"}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
            <p id="calc-hint" className="text-[#6b9a6b] text-xs text-center">
              Adjust the sliders above to match your habits, then click Calculate.
            </p>
          </motion.div>

          {/* Results Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            {!calculated ? (
              /* Pre-calculation placeholder */
              <div className="glass-card rounded-2xl p-8 flex flex-col items-center justify-center text-center h-full min-h-[300px] border border-dashed border-[rgba(0,255,136,0.2)]">
                <div className="w-16 h-16 rounded-2xl bg-[rgba(0,255,136,0.1)] flex items-center justify-center mb-4" aria-hidden="true">
                  <BarChart3 className="w-8 h-8 text-[#00ff88]" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">Ready to Calculate?</h3>
                <p className="text-[#6b9a6b] text-sm max-w-xs">
                  Adjust the lifestyle sliders on the left, then click{" "}
                  <strong className="text-[#00ff88]">Calculate My Carbon Score</strong> to see your personalised results.
                </p>
              </div>
            ) : (
              <>
                {/* Score */}
                <div className="glass-card rounded-2xl p-6" role="region" aria-label="Your carbon score">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-display font-semibold">Carbon Score</h3>
                    <Link href="/dashboard" className="text-xs text-[#00d4ff] hover:text-[#00ff88] flex items-center gap-1 transition-colors">
                      <History className="w-3 h-3" />
                      View History
                    </Link>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-32 h-32" aria-hidden="true">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadialBarChart
                          cx="50%"
                          cy="50%"
                          innerRadius="60%"
                          outerRadius="100%"
                          data={chartData}
                          startAngle={90}
                          endAngle={-270}
                        >
                          <RadialBar dataKey="value" cornerRadius={10} />
                        </RadialBarChart>
                      </ResponsiveContainer>
                    </div>
                    <div>
                      <div
                        className="text-5xl font-display font-bold text-gradient"
                        aria-label={`Score: ${score} out of 100`}
                      >
                        {score}
                      </div>
                      <div className="text-[#6b9a6b] text-sm" aria-hidden="true">out of 100</div>
                      <div className="mt-2 badge-green">{getScoreLabel(score)}</div>
                    </div>
                  </div>
                </div>

                {/* Emissions breakdown */}
                <div className="glass-card rounded-2xl p-6" role="region" aria-label="Monthly emissions breakdown">
                  <h3 className="font-display font-semibold mb-4">Monthly Emissions</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="stat-card">
                      <div className="text-2xl font-bold text-gradient font-display">
                        {Math.round(monthlyKg)} kg
                      </div>
                      <div className="text-[#6b9a6b] text-xs mt-1">Your monthly CO₂</div>
                    </div>
                    <div className="stat-card">
                      <div className="text-2xl font-bold text-[#00d4ff] font-display">
                        {(Math.round(yearlyKg / 100) / 10).toFixed(1)}t
                      </div>
                      <div className="text-[#6b9a6b] text-xs mt-1">Yearly total</div>
                    </div>
                    <div className="stat-card">
                      <div className="text-2xl font-bold text-[#ffd700] font-display">
                        {(GLOBAL_AVG_YEARLY_KG / 1000).toFixed(1)}t
                      </div>
                      <div className="text-[#6b9a6b] text-xs mt-1">Global average</div>
                    </div>
                    <div className="stat-card">
                      <div
                        className="text-2xl font-bold font-display"
                        style={{ color: vsGlobalAvg < 0 ? "#00ff88" : "#f97316" }}
                      >
                        {vsGlobalAvg < 0 ? "−" : "+"}
                        {(Math.abs(vsGlobalAvg) / 1000).toFixed(1)}t
                      </div>
                      <div className="text-[#6b9a6b] text-xs mt-1">vs global avg</div>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="glass-card rounded-2xl p-6" role="region" aria-label="Personalised recommendations">
                  <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
                    <TrendingDown className="w-5 h-5 text-[#00ff88]" aria-hidden="true" />
                    Top Recommendations
                  </h3>
                  <div className="space-y-3">
                    {recommendations.length > 0 ? (
                      recommendations.map((rec) => {
                        const config = SLIDER_CONFIGS.find(c => c.id === rec.category);
                        return (
                          <div
                            key={rec.title}
                            className="flex flex-col gap-2 p-4 rounded-xl bg-[rgba(0,255,136,0.05)] border border-[rgba(0,255,136,0.1)] hover:bg-[rgba(0,255,136,0.08)] transition-colors"
                          >
                            <div className="flex items-start justify-between">
                              <h4 className="font-semibold text-white text-sm">{rec.title}</h4>
                              <span 
                                className="text-[10px] font-bold px-2 py-0.5 rounded-full border"
                                style={{ borderColor: config?.color, color: config?.color, backgroundColor: `${config?.color}15` }}
                              >
                                {config?.label.toUpperCase()}
                              </span>
                            </div>
                            <p className="text-[#88aa88] text-sm">{rec.action}</p>
                            {rec.savingsKgPerMonth > 0 && (
                              <div className="text-xs font-mono text-[#00ff88] mt-1 flex items-center gap-1">
                                <TrendingDown className="w-3 h-3" />
                                Save {rec.savingsKgPerMonth} kg/mo
                              </div>
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <div className="p-4 rounded-xl bg-[rgba(0,255,136,0.05)] border border-[rgba(0,255,136,0.1)] text-[#88aa88] text-sm text-center">
                        You have an incredibly low footprint! Keep up the great work and consider offsetting any remaining emissions.
                      </div>
                    )}
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
