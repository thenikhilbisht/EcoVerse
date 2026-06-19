/**
 * Central typed constants module for EcoVerse.
 *
 * Every emission factor, threshold, slider range, XP boundary, and score label
 * lives here so nothing is hard-coded elsewhere in the codebase.
 *
 * @module constants
 */

// ─── Emission Factors (kg CO₂-equivalent per unit) ──────────────────────────

/** All emission factors used in carbon footprint calculations. */
export const EMISSION_FACTORS = {
  /** kg CO₂ per km driven (average car) */
  transportPerKm: 0.21,
  /** kg CO₂ per kWh (average grid mix) */
  electricityPerKwh: 0.82,
  /** kg CO₂ per litre of water per day (treatment + heating) */
  waterPerLitrePerDay: 0.002,
  /** kg CO₂ per meat meal */
  foodPerMeal: 3.5,
  /** kg CO₂ per new shopping item */
  shoppingPerItem: 15,
  /** kg CO₂ per hour of streaming/device use */
  digitalPerHour: 0.036,
} as const;

// ─── Time Constants ─────────────────────────────────────────────────────────

/** Days per month used for daily → monthly conversion. */
export const DAYS_PER_MONTH = 30;

/** Weeks per month used for weekly → monthly conversion. */
export const WEEKS_PER_MONTH = 4;

/** Months per year. */
export const MONTHS_PER_YEAR = 12;

// ─── Reference Values ───────────────────────────────────────────────────────

/** Global average yearly carbon footprint in kg CO₂. */
export const GLOBAL_AVG_YEARLY_KG = 4000;

/** Maximum yearly footprint used for eco-score scaling (0–100). */
export const SCORE_SCALE_MAX_KG = 20000;

// ─── Score Label Thresholds ─────────────────────────────────────────────────

/** Score ranges and their labels. Ordered high → low for lookup. */
export const SCORE_LABELS = [
  { minScore: 71, label: "Eco Hero 🌿" },
  { minScore: 41, label: "Improving 📈" },
  { minScore: 0, label: "Needs Work ⚡" },
] as const;

// ─── Slider / Category Configuration ────────────────────────────────────────

/** Identifies a lifestyle category tracked by the calculator. */
export type CategoryId =
  | "transport"
  | "electricity"
  | "water"
  | "food"
  | "shopping"
  | "digital";

/** Configuration for a single calculator slider. */
export interface SliderConfig {
  /** Category identifier matching CarbonInputs keys. */
  id: CategoryId;
  /** Human-readable label. */
  label: string;
  /** Unit shown to the user (e.g. "km/week"). */
  unit: string;
  /** Maximum slider value. */
  max: number;
  /** Theme colour (hex). */
  color: string;
  /** Short description shown under the label. */
  description: string;
  /** Default value for a new calculation. */
  defaultValue: number;
}

/** All calculator slider configurations. */
export const SLIDER_CONFIGS: readonly SliderConfig[] = [
  { id: "transport", label: "Transport", unit: "km/week", max: 500, color: "#00ff88", description: "Car, flights, public transit", defaultValue: 100 },
  { id: "electricity", label: "Electricity", unit: "kWh/month", max: 1000, color: "#00d4ff", description: "Home energy usage", defaultValue: 250 },
  { id: "water", label: "Water", unit: "litres/day", max: 500, color: "#60a5fa", description: "Daily water consumption", defaultValue: 150 },
  { id: "food", label: "Food", unit: "meat meals/week", max: 21, color: "#ffd700", description: "Diet and food habits", defaultValue: 7 },
  { id: "shopping", label: "Shopping", unit: "items/month", max: 20, color: "#f97316", description: "New purchases", defaultValue: 5 },
  { id: "digital", label: "Digital", unit: "hours/day", max: 24, color: "#a78bfa", description: "Streaming & devices", defaultValue: 6 },
] as const;

// ─── XP & Rank System ───────────────────────────────────────────────────────

/** A rank/level in the gamification system. */
export interface RankInfo {
  /** Display name. */
  name: string;
  /** Minimum XP to reach this rank. */
  minXP: number;
  /** Theme colour. */
  color: string;
  /** Lucide icon name used in the UI. */
  iconName: "Leaf" | "Shield" | "Star" | "Flame" | "Crown";
}

/** Ordered list of ranks (lowest → highest). */
export const RANKS: readonly RankInfo[] = [
  { name: "Green Beginner", minXP: 0, color: "#00ff88", iconName: "Leaf" },
  { name: "Eco Warrior", minXP: 1_000, color: "#00d4ff", iconName: "Shield" },
  { name: "Climate Hero", minXP: 10_000, color: "#ffd700", iconName: "Star" },
  { name: "Earth Guardian", minXP: 25_000, color: "#f97316", iconName: "Flame" },
  { name: "Carbon Master", minXP: 40_000, color: "#a78bfa", iconName: "Crown" },
] as const;

/** XP awarded for completing a challenge. */
export const XP_PER_CHALLENGE_COMPLETE = 50;

/** Bonus XP multiplier for maintaining a streak. */
export const STREAK_BONUS_MULTIPLIER = 1.5;

// ─── Rate Limiting ──────────────────────────────────────────────────────────

/** Max messages allowed in the chat within one rate-limit window. */
export const CHAT_RATE_LIMIT_MAX = 10;

/** Duration of the rate-limit sliding window in milliseconds. */
export const CHAT_RATE_LIMIT_WINDOW_MS = 60_000;

// ─── Calculator Debounce ────────────────────────────────────────────────────

/** Debounce delay in ms for slider input changes. */
export const SLIDER_DEBOUNCE_MS = 150;

// ─── History ────────────────────────────────────────────────────────────────

/** localStorage key for calculation history. */
export const HISTORY_STORAGE_KEY = "ecoverse_calculation_history";

/** Maximum number of history entries stored. */
export const HISTORY_MAX_ENTRIES = 200;

// ─── Difficulty Colours ─────────────────────────────────────────────────────

/** Colour mapping for challenge difficulty levels. */
export const DIFFICULTY_COLORS: Record<string, string> = {
  Easy: "#00ff88",
  Medium: "#ffd700",
  Hard: "#f97316",
} as const;

// ─── Leaderboard Rank Colours ───────────────────────────────────────────────

/** Colours for podium positions. */
export const PODIUM_COLORS: Record<number, string> = {
  1: "#ffd700",
  2: "#c0c0c0",
  3: "#cd7f32",
} as const;

/** Labels for podium positions. */
export const PODIUM_LABELS: Record<number, string> = {
  1: "Gold",
  2: "Silver",
  3: "Bronze",
} as const;
