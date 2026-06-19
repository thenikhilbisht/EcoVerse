/**
 * Carbon footprint calculation utilities.
 *
 * Pure, framework-agnostic functions for computing monthly/yearly emissions,
 * eco-scores, and score labels. All emission factors and thresholds are
 * imported from the central `constants` module.
 *
 * @module carbonUtils
 */

import {
  EMISSION_FACTORS,
  DAYS_PER_MONTH,
  WEEKS_PER_MONTH,
  MONTHS_PER_YEAR,
  GLOBAL_AVG_YEARLY_KG as _GLOBAL_AVG,
  SCORE_SCALE_MAX_KG as _SCORE_MAX,
  SCORE_LABELS,
  SLIDER_CONFIGS,
} from "./constants";

import { generateRecommendations, generateTipsFromEngine } from "./recommendationEngine";

// ─── Re-exports for backward compatibility ──────────────────────────────────

/**
 * Re-exported emission factors (individual constants) so existing imports
 * such as `import { EMISSION_TRANSPORT_PER_KM } from "@/lib/carbonUtils"`
 * continue to work.
 */
export const EMISSION_TRANSPORT_PER_KM = EMISSION_FACTORS.transportPerKm;
export const EMISSION_ELECTRICITY_PER_KWH = EMISSION_FACTORS.electricityPerKwh;
export const EMISSION_WATER_PER_LITRE_PER_DAY = EMISSION_FACTORS.waterPerLitrePerDay;
export const EMISSION_FOOD_PER_MEAL = EMISSION_FACTORS.foodPerMeal;
export const EMISSION_SHOPPING_PER_ITEM = EMISSION_FACTORS.shoppingPerItem;
export const EMISSION_DIGITAL_PER_HOUR = EMISSION_FACTORS.digitalPerHour;

export { DAYS_PER_MONTH, WEEKS_PER_MONTH };

export const GLOBAL_AVG_YEARLY_KG = _GLOBAL_AVG;
export const SCORE_SCALE_MAX_KG = _SCORE_MAX;

// ─── Types ──────────────────────────────────────────────────────────────────

/** Raw lifestyle inputs for the carbon calculator (all numeric). */
export interface CarbonInputs {
  /** Weekly car/flight km. */
  transport: number;
  /** Monthly electricity consumption in kWh. */
  electricity: number;
  /** Daily water consumption in litres. */
  water: number;
  /** Meat meals per week. */
  food: number;
  /** New shopping items per month. */
  shopping: number;
  /** Daily hours of streaming/device use. */
  digital: number;
}

/** Computed carbon footprint result. */
export interface CarbonResult {
  /** Estimated monthly CO₂ emissions in kg. */
  monthlyKg: number;
  /** Estimated yearly CO₂ emissions in kg (monthlyKg × 12). */
  yearlyKg: number;
  /** Eco-score from 0 (worst) to 100 (best). */
  score: number;
  /** Difference vs global average in kg (positive = above average). */
  vsGlobalAvg: number;
}

// ─── Default Inputs ─────────────────────────────────────────────────────────

/** Default values for every calculator slider, derived from SLIDER_CONFIGS. */
export const DEFAULT_INPUTS: CarbonInputs = SLIDER_CONFIGS.reduce(
  (acc, config) => {
    acc[config.id] = config.defaultValue;
    return acc;
  },
  {} as Record<string, number>
) as unknown as CarbonInputs;

// ─── Calculation Functions ──────────────────────────────────────────────────

/**
 * Calculates the estimated monthly carbon footprint in kg CO₂.
 *
 * Formula per category:
 * - Transport: km × factor
 * - Electricity: kWh × factor
 * - Water: litres/day × factor × 30 days
 * - Food: meals/week × factor × 4 weeks
 * - Shopping: items × factor
 * - Digital: hours/day × factor × 30 days
 *
 * @param inputs - User's lifestyle data.
 * @returns      - Monthly CO₂ in kg. Always ≥ 0.
 *
 * @example
 * ```ts
 * calculateMonthlyCarbon({ transport: 100, electricity: 250, water: 150, food: 7, shopping: 5, digital: 6 });
 * // ~386.48
 * ```
 */
export function calculateMonthlyCarbon(inputs: CarbonInputs): number {
  const { transport, electricity, water, food, shopping, digital } = inputs;
  return (
    transport * EMISSION_FACTORS.transportPerKm +
    electricity * EMISSION_FACTORS.electricityPerKwh +
    water * EMISSION_FACTORS.waterPerLitrePerDay * DAYS_PER_MONTH +
    food * EMISSION_FACTORS.foodPerMeal * WEEKS_PER_MONTH +
    shopping * EMISSION_FACTORS.shoppingPerItem +
    digital * EMISSION_FACTORS.digitalPerHour * DAYS_PER_MONTH
  );
}

/**
 * Returns a 0–100 eco-score (higher = better / lower footprint).
 *
 * The score is linearly scaled: 0 yearly kg → 100, SCORE_SCALE_MAX_KG → 0.
 * Values are clamped to [0, 100].
 *
 * @param yearlyKg - Estimated yearly CO₂ in kg.
 * @returns        - Integer score between 0 and 100 (inclusive).
 */
export function calculateScore(yearlyKg: number): number {
  return Math.max(
    0,
    Math.min(100, 100 - Math.round((yearlyKg / _SCORE_MAX) * 100))
  );
}

/**
 * Returns a human-readable label for the given eco-score.
 *
 * Uses the thresholds defined in `SCORE_LABELS`:
 * - 71–100 → "Eco Hero 🌿"
 * - 41–70  → "Improving 📈"
 * - 0–40   → "Needs Work ⚡"
 *
 * @param score - Eco-score (0–100).
 * @returns     - Label string with emoji.
 */
export function getScoreLabel(score: number): string {
  for (const { minScore, label } of SCORE_LABELS) {
    if (score >= minScore) return label;
  }
  return SCORE_LABELS[SCORE_LABELS.length - 1].label;
}

/**
 * Computes a full carbon result from raw lifestyle inputs.
 *
 * This is the primary entry-point: it chains `calculateMonthlyCarbon`,
 * `calculateScore`, and the global-average comparison.
 *
 * @param inputs - User's lifestyle data.
 * @returns      - Complete result with monthly, yearly, score, and vs-average.
 */
export function computeCarbonResult(inputs: CarbonInputs): CarbonResult {
  const monthlyKg = calculateMonthlyCarbon(inputs);
  const yearlyKg = monthlyKg * MONTHS_PER_YEAR;
  const score = calculateScore(yearlyKg);
  const vsGlobalAvg = yearlyKg - _GLOBAL_AVG;
  return { monthlyKg, yearlyKg, score, vsGlobalAvg };
}

/**
 * Generates personalised reduction tips based on current inputs.
 *
 * Delegates to the recommendation engine and returns simple string tips
 * for backward compatibility. Tips are ranked by highest-impact action first.
 *
 * @param inputs  - User's lifestyle data.
 * @param yearlyKg - The user's yearly emissions (used for threshold checks).
 * @returns       - Array of up to 3 tip strings.
 */
export function generateTips(inputs: CarbonInputs, yearlyKg: number): string[] {
  return generateTipsFromEngine(inputs, yearlyKg);
}

// Re-export recommendation engine for direct use
export { generateRecommendations } from "./recommendationEngine";
export type { Recommendation } from "./recommendationEngine";
