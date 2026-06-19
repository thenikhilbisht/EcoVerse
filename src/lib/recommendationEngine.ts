/**
 * Personalised carbon reduction recommendation engine.
 *
 * Takes the user's actual inputs, calculates per-category emissions, and
 * returns concrete recommendations sorted by highest impact first. Each
 * recommendation includes an estimated CO₂ savings figure derived from
 * the user's real data — not generic copy.
 *
 * @module recommendationEngine
 */

import {
  EMISSION_FACTORS,
  DAYS_PER_MONTH,
  WEEKS_PER_MONTH,
  type CategoryId,
} from "./constants";
import type { CarbonInputs } from "./carbonUtils";

// ─── Types ──────────────────────────────────────────────────────────────────

/** A single actionable recommendation. */
export interface Recommendation {
  /** The lifestyle category this recommendation addresses. */
  category: CategoryId;
  /** Short action title (e.g. "Switch to cycling"). */
  title: string;
  /** Concrete, jargon-free description of what to do. */
  action: string;
  /** Estimated monthly CO₂ savings in kg, based on the user's inputs. */
  savingsKgPerMonth: number;
  /** Priority rank — lower = higher impact. Derived from `savingsKgPerMonth`. */
  priority: number;
}

// ─── Per-Category Emission Breakdown ────────────────────────────────────────

/**
 * Calculates the monthly CO₂ contribution of each category.
 *
 * @param inputs - The user's lifestyle inputs.
 * @returns      - Object mapping each category to its monthly kg CO₂.
 */
export function getCategoryBreakdown(
  inputs: CarbonInputs
): Record<CategoryId, number> {
  return {
    transport: inputs.transport * EMISSION_FACTORS.transportPerKm,
    electricity: inputs.electricity * EMISSION_FACTORS.electricityPerKwh,
    water:
      inputs.water * EMISSION_FACTORS.waterPerLitrePerDay * DAYS_PER_MONTH,
    food: inputs.food * EMISSION_FACTORS.foodPerMeal * WEEKS_PER_MONTH,
    shopping: inputs.shopping * EMISSION_FACTORS.shoppingPerItem,
    digital:
      inputs.digital * EMISSION_FACTORS.digitalPerHour * DAYS_PER_MONTH,
  };
}

// ─── Recommendation Templates ───────────────────────────────────────────────

interface RecommendationTemplate {
  category: CategoryId;
  /** Minimum monthly kg CO₂ for this category before the tip applies. */
  minCategoryKg: number;
  title: string;
  /**
   * Returns a concrete action string. Receives the user's input value and
   * estimated savings so the copy is personalised.
   */
  action: (inputValue: number, savingsKg: number) => string;
  /**
   * Estimated savings as a fraction of the category's current emissions
   * (e.g. 0.3 = 30% reduction).
   */
  savingsFraction: number;
}

const TEMPLATES: RecommendationTemplate[] = [
  {
    category: "transport",
    minCategoryKg: 10,
    title: "Switch trips to cycling or walking",
    action: (val, savings) =>
      `Replace 2 of your ${val} km/week car trips with cycling → save ~${Math.round(savings)} kg CO₂/month`,
    savingsFraction: 0.3,
  },
  {
    category: "transport",
    minCategoryKg: 30,
    title: "Use public transport",
    action: (val, savings) =>
      `Take the bus/train instead of driving for ${Math.round(val * 0.4)} km/week → save ~${Math.round(savings)} kg CO₂/month`,
    savingsFraction: 0.2,
  },
  {
    category: "electricity",
    minCategoryKg: 50,
    title: "Switch to renewable energy",
    action: (val, savings) =>
      `Switch your ${val} kWh/month to a green energy plan → save ~${Math.round(savings)} kg CO₂/month`,
    savingsFraction: 0.7,
  },
  {
    category: "electricity",
    minCategoryKg: 20,
    title: "Reduce standby power",
    action: (_val, savings) =>
      `Unplug devices when not in use and switch to LED bulbs → save ~${Math.round(savings)} kg CO₂/month`,
    savingsFraction: 0.15,
  },
  {
    category: "water",
    minCategoryKg: 3,
    title: "Shorten showers by 2 minutes",
    action: (val, savings) =>
      `Cut your ${val} litres/day usage by taking shorter showers → save ~${Math.round(savings)} kg CO₂/month`,
    savingsFraction: 0.2,
  },
  {
    category: "food",
    minCategoryKg: 20,
    title: "Go plant-based 3 days/week",
    action: (val, savings) =>
      `Replace 3 of your ${val} meat meals/week with plant-based options → save ~${Math.round(savings)} kg CO₂/month`,
    savingsFraction: 0.4,
  },
  {
    category: "food",
    minCategoryKg: 40,
    title: "Cut red meat significantly",
    action: (_val, savings) =>
      `Switch beef and lamb for chicken or fish → save ~${Math.round(savings)} kg CO₂/month (red meat emits 5× more)`,
    savingsFraction: 0.35,
  },
  {
    category: "shopping",
    minCategoryKg: 30,
    title: "Buy secondhand or fewer items",
    action: (val, savings) =>
      `Buy ${Math.max(1, Math.round(val * 0.4))} fewer new items/month or choose secondhand → save ~${Math.round(savings)} kg CO₂/month`,
    savingsFraction: 0.4,
  },
  {
    category: "shopping",
    minCategoryKg: 15,
    title: "Choose sustainable brands",
    action: (_val, savings) =>
      `Pick brands with verified sustainability certifications → save ~${Math.round(savings)} kg CO₂/month`,
    savingsFraction: 0.2,
  },
  {
    category: "digital",
    minCategoryKg: 2,
    title: "Reduce streaming hours",
    action: (val, savings) =>
      `Cut ${Math.max(1, Math.round(val * 0.3))} hours/day of streaming → save ~${Math.round(savings)} kg CO₂/month`,
    savingsFraction: 0.3,
  },
];

// ─── Main Engine ────────────────────────────────────────────────────────────

/**
 * Generates personalised, ranked carbon reduction recommendations.
 *
 * The engine:
 * 1. Calculates per-category emissions from the user's inputs.
 * 2. Filters templates by minimum category threshold.
 * 3. Computes concrete savings figures from the user's actual data.
 * 4. Sorts by highest savings first.
 * 5. Returns at most `maxResults` recommendations.
 *
 * @param inputs     - The user's lifestyle data.
 * @param maxResults - Maximum number of recommendations to return (default 5).
 * @returns          - Sorted array of personalised recommendations.
 *
 * @example
 * ```ts
 * const recs = generateRecommendations({ transport: 200, electricity: 500, ... });
 * // [{ title: "Switch to renewable energy", savingsKgPerMonth: 287, ... }, ...]
 * ```
 */
export function generateRecommendations(
  inputs: CarbonInputs,
  maxResults = 5
): Recommendation[] {
  const breakdown = getCategoryBreakdown(inputs);

  const recommendations: Recommendation[] = [];

  for (const template of TEMPLATES) {
    const categoryKg = breakdown[template.category];
    if (categoryKg < template.minCategoryKg) continue;

    const savingsKg = categoryKg * template.savingsFraction;
    if (savingsKg < 0.5) continue; // Skip trivial savings

    recommendations.push({
      category: template.category,
      title: template.title,
      action: template.action(inputs[template.category], savingsKg),
      savingsKgPerMonth: Math.round(savingsKg * 10) / 10,
      priority: 0, // Will be set after sorting
    });
  }

  // Sort by highest savings first
  recommendations.sort((a, b) => b.savingsKgPerMonth - a.savingsKgPerMonth);

  // Assign priority ranks
  recommendations.forEach((r, i) => {
    r.priority = i + 1;
  });

  return recommendations.slice(0, maxResults);
}

/**
 * Legacy-compatible tip generator that returns string-only tips.
 *
 * Wraps `generateRecommendations` and formats the output as simple strings
 * for backward compatibility with existing UI and tests.
 *
 * @param inputs  - The user's lifestyle data.
 * @param _yearlyKg - Unused, kept for backward compatibility.
 * @returns       - Array of tip strings (max 3).
 */
export function generateTipsFromEngine(
  inputs: CarbonInputs,
  _yearlyKg: number
): string[] {
  const recs = generateRecommendations(inputs, 3);
  if (recs.length === 0) {
    return ["Plant 10 trees to offset your remaining footprint"];
  }
  return recs.map((r) => r.action);
}
