import { describe, it, expect } from "vitest";
import {
  calculateMonthlyCarbon,
  calculateScore,
  computeCarbonResult,
  generateTips,
  getScoreLabel,
  DEFAULT_INPUTS,
  GLOBAL_AVG_YEARLY_KG,
  SCORE_SCALE_MAX_KG,
  type CarbonInputs,
} from "../../lib/carbonUtils";

// ─── calculateMonthlyCarbon ───────────────────────────────────────────────────

describe("calculateMonthlyCarbon", () => {
  it("returns a positive number for default inputs", () => {
    const result = calculateMonthlyCarbon(DEFAULT_INPUTS);
    expect(result).toBeGreaterThan(0);
  });

  it("returns 0 for all-zero inputs", () => {
    const zero: CarbonInputs = { transport: 0, electricity: 0, water: 0, food: 0, shopping: 0, digital: 0 };
    expect(calculateMonthlyCarbon(zero)).toBe(0);
  });

  it("increases monotonically with each category", () => {
    const base = calculateMonthlyCarbon(DEFAULT_INPUTS);
    expect(calculateMonthlyCarbon({ ...DEFAULT_INPUTS, transport: DEFAULT_INPUTS.transport + 100 })).toBeGreaterThan(base);
    expect(calculateMonthlyCarbon({ ...DEFAULT_INPUTS, electricity: DEFAULT_INPUTS.electricity + 100 })).toBeGreaterThan(base);
    expect(calculateMonthlyCarbon({ ...DEFAULT_INPUTS, water: DEFAULT_INPUTS.water + 100 })).toBeGreaterThan(base);
    expect(calculateMonthlyCarbon({ ...DEFAULT_INPUTS, food: DEFAULT_INPUTS.food + 5 })).toBeGreaterThan(base);
    expect(calculateMonthlyCarbon({ ...DEFAULT_INPUTS, shopping: DEFAULT_INPUTS.shopping + 5 })).toBeGreaterThan(base);
    expect(calculateMonthlyCarbon({ ...DEFAULT_INPUTS, digital: DEFAULT_INPUTS.digital + 5 })).toBeGreaterThan(base);
  });

  it("matches manually computed value for default inputs", () => {
    // transport: 100*0.21 + electricity: 250*0.82 + water: 150*0.002*30 + food: 7*3.5*4 + shopping: 5*15 + digital: 6*0.036*30
    const expected = 100 * 0.21 + 250 * 0.82 + 150 * 0.002 * 30 + 7 * 3.5 * 4 + 5 * 15 + 6 * 0.036 * 30;
    expect(calculateMonthlyCarbon(DEFAULT_INPUTS)).toBeCloseTo(expected, 5);
  });

  it("returns a number (not NaN or Infinity) for max-scale inputs", () => {
    const max: CarbonInputs = { transport: 500, electricity: 1000, water: 500, food: 21, shopping: 20, digital: 24 };
    const result = calculateMonthlyCarbon(max);
    expect(Number.isFinite(result)).toBe(true);
    expect(result).toBeGreaterThan(0);
  });
});

// ─── calculateScore ───────────────────────────────────────────────────────────

describe("calculateScore", () => {
  it("returns 100 for 0 kg/year emissions", () => {
    expect(calculateScore(0)).toBe(100);
  });

  it("returns 0 for emissions at or above the scale max", () => {
    expect(calculateScore(SCORE_SCALE_MAX_KG)).toBe(0);
    expect(calculateScore(SCORE_SCALE_MAX_KG + 1000)).toBe(0); // clamped
  });

  it("returns 50 for half of scale max", () => {
    expect(calculateScore(SCORE_SCALE_MAX_KG / 2)).toBe(50);
  });

  it("always returns a value between 0 and 100 (inclusive)", () => {
    [-1000, 0, 1000, 5000, 10000, 25000].forEach((kg) => {
      const s = calculateScore(kg);
      expect(s).toBeGreaterThanOrEqual(0);
      expect(s).toBeLessThanOrEqual(100);
    });
  });

  it("returns an integer (Math.round)", () => {
    const s = calculateScore(3333);
    expect(Number.isInteger(s)).toBe(true);
  });
});

// ─── getScoreLabel ────────────────────────────────────────────────────────────

describe("getScoreLabel", () => {
  it("returns Eco Hero label for scores above 70", () => {
    expect(getScoreLabel(71)).toContain("Eco Hero");
    expect(getScoreLabel(100)).toContain("Eco Hero");
  });

  it("returns Improving label for scores 41-70", () => {
    expect(getScoreLabel(41)).toContain("Improving");
    expect(getScoreLabel(70)).toContain("Improving");
  });

  it("returns Needs Work label for scores 0-40", () => {
    expect(getScoreLabel(0)).toContain("Needs Work");
    expect(getScoreLabel(40)).toContain("Needs Work");
  });
});

// ─── computeCarbonResult ──────────────────────────────────────────────────────

describe("computeCarbonResult", () => {
  it("returns the four expected fields", () => {
    const result = computeCarbonResult(DEFAULT_INPUTS);
    expect(result).toHaveProperty("monthlyKg");
    expect(result).toHaveProperty("yearlyKg");
    expect(result).toHaveProperty("score");
    expect(result).toHaveProperty("vsGlobalAvg");
  });

  it("yearlyKg is 12× monthlyKg", () => {
    const result = computeCarbonResult(DEFAULT_INPUTS);
    expect(result.yearlyKg).toBeCloseTo(result.monthlyKg * 12, 5);
  });

  it("vsGlobalAvg is yearlyKg minus the global average", () => {
    const result = computeCarbonResult(DEFAULT_INPUTS);
    expect(result.vsGlobalAvg).toBeCloseTo(result.yearlyKg - GLOBAL_AVG_YEARLY_KG, 5);
  });

  it("vsGlobalAvg is negative for zero-emission inputs (well below avg)", () => {
    const zero: CarbonInputs = { transport: 0, electricity: 0, water: 0, food: 0, shopping: 0, digital: 0 };
    const result = computeCarbonResult(zero);
    expect(result.vsGlobalAvg).toBeLessThan(0);
  });

  it("vsGlobalAvg is positive for max-emission inputs (well above avg)", () => {
    const max: CarbonInputs = { transport: 500, electricity: 1000, water: 500, food: 21, shopping: 20, digital: 24 };
    const result = computeCarbonResult(max);
    expect(result.vsGlobalAvg).toBeGreaterThan(0);
  });
});

// ─── generateTips ─────────────────────────────────────────────────────────────

describe("generateTips", () => {
  it("always returns at most 3 tips", () => {
    const max: CarbonInputs = { transport: 500, electricity: 1000, water: 0, food: 21, shopping: 20, digital: 24 };
    expect(generateTips(max, 50000).length).toBeLessThanOrEqual(3);
  });

  it("always returns at least 1 tip (the tree tip)", () => {
    const zero: CarbonInputs = { transport: 0, electricity: 0, water: 0, food: 0, shopping: 0, digital: 0 };
    expect(generateTips(zero, 0).length).toBeGreaterThanOrEqual(1);
  });

  it("returns an array of strings", () => {
    const tips = generateTips(DEFAULT_INPUTS, 5000);
    tips.forEach((tip) => expect(typeof tip).toBe("string"));
  });

  it("includes transport tip when yearly emissions > 6000 kg", () => {
    const high: CarbonInputs = { ...DEFAULT_INPUTS, transport: 400 };
    const { yearlyKg } = computeCarbonResult(high);
    if (yearlyKg > 6000) {
      const tips = generateTips(high, yearlyKg);
      expect(tips.some((t) => t.toLowerCase().includes("transport"))).toBe(true);
    }
  });

  it("includes food tip when food > 10 meals/week", () => {
    const highFood: CarbonInputs = { ...DEFAULT_INPUTS, food: 15 };
    const tips = generateTips(highFood, 1000);
    expect(tips.some((t) => t.toLowerCase().includes("meat"))).toBe(true);
  });

  it("includes electricity tip when electricity > 400 kWh/month", () => {
    const highElec: CarbonInputs = { ...DEFAULT_INPUTS, electricity: 500 };
    const tips = generateTips(highElec, 1000);
    expect(tips.some((t) => t.toLowerCase().includes("green energy"))).toBe(true);
  });

  it("includes shopping tip when shopping > 8 items/month", () => {
    const highShop: CarbonInputs = { ...DEFAULT_INPUTS, shopping: 10 };
    const tips = generateTips(highShop, 1000);
    expect(tips.some((t) => t.toLowerCase().includes("secondhand"))).toBe(true);
  });
});

// ─── DEFAULT_INPUTS ───────────────────────────────────────────────────────────

describe("DEFAULT_INPUTS", () => {
  it("contains all required CarbonInputs keys", () => {
    const keys: Array<keyof CarbonInputs> = ["transport", "electricity", "water", "food", "shopping", "digital"];
    keys.forEach((key) => {
      expect(DEFAULT_INPUTS).toHaveProperty(key);
      expect(typeof DEFAULT_INPUTS[key]).toBe("number");
    });
  });

  it("all values are non-negative", () => {
    Object.values(DEFAULT_INPUTS).forEach((v) => expect(v).toBeGreaterThanOrEqual(0));
  });
});
