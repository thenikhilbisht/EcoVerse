import { describe, it, expect } from "vitest";
import {
  generateRecommendations,
  getCategoryBreakdown,
} from "../recommendationEngine";
import { DEFAULT_INPUTS, type CarbonInputs } from "../carbonUtils";

describe("recommendationEngine", () => {
  describe("getCategoryBreakdown", () => {
    it("computes non-zero breakdown for default inputs", () => {
      const breakdown = getCategoryBreakdown(DEFAULT_INPUTS);
      expect(breakdown.transport).toBeGreaterThan(0);
      expect(breakdown.electricity).toBeGreaterThan(0);
      expect(breakdown.water).toBeGreaterThan(0);
      expect(breakdown.food).toBeGreaterThan(0);
      expect(breakdown.shopping).toBeGreaterThan(0);
      expect(breakdown.digital).toBeGreaterThan(0);
    });

    it("returns zero for zero inputs", () => {
      const zero: CarbonInputs = { transport: 0, electricity: 0, water: 0, food: 0, shopping: 0, digital: 0 };
      const breakdown = getCategoryBreakdown(zero);
      expect(Object.values(breakdown).every((v) => v === 0)).toBe(true);
    });
  });

  describe("generateRecommendations", () => {
    it("returns empty array for zero inputs (too low for tips)", () => {
      const zero: CarbonInputs = { transport: 0, electricity: 0, water: 0, food: 0, shopping: 0, digital: 0 };
      const recs = generateRecommendations(zero);
      expect(recs).toHaveLength(0);
    });

    it("ranks recommendations by highest impact first", () => {
      // Very high transport, moderate electricity
      const inputs: CarbonInputs = { ...DEFAULT_INPUTS, transport: 5000, electricity: 200 };
      const recs = generateRecommendations(inputs);
      
      expect(recs.length).toBeGreaterThan(1);
      
      // Ensure priority matches array order and savings descend
      for (let i = 0; i < recs.length - 1; i++) {
        expect(recs[i].priority).toBe(i + 1);
        expect(recs[i].savingsKgPerMonth).toBeGreaterThanOrEqual(recs[i + 1].savingsKgPerMonth);
      }
      
      // Highest should be transport related
      expect(recs[0].category).toBe("transport");
    });

    it("respects maxResults limit", () => {
      const high: CarbonInputs = { transport: 500, electricity: 1000, water: 500, food: 21, shopping: 20, digital: 24 };
      const recs2 = generateRecommendations(high, 2);
      expect(recs2).toHaveLength(2);
      
      const recs5 = generateRecommendations(high, 5);
      expect(recs5).toHaveLength(5);
    });

    it("includes estimated savings in the recommendation object", () => {
      const recs = generateRecommendations(DEFAULT_INPUTS);
      if (recs.length > 0) {
        expect(recs[0].savingsKgPerMonth).toBeGreaterThan(0);
        expect(typeof recs[0].title).toBe("string");
        expect(typeof recs[0].action).toBe("string");
      }
    });
  });
});
