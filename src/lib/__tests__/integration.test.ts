import { describe, it, expect, beforeEach } from "vitest";
import { computeCarbonResult, type CarbonInputs } from "../carbonUtils";
import { generateRecommendations } from "../recommendationEngine";
import { saveCalculation, getHistory, clearHistory } from "../historyStore";

describe("Integration: Calculation Flow", () => {
  beforeEach(() => {
    clearHistory();
  });

  it("processes a full calculation, recommendation, and history save flow", () => {
    // 1. User inputs
    const inputs: CarbonInputs = {
      transport: 2000,
      electricity: 400,
      water: 200,
      food: 14,
      shopping: 10,
      digital: 8,
    };

    // 2. Compute results
    const result = computeCarbonResult(inputs);
    expect(result.monthlyKg).toBeGreaterThan(0);
    expect(result.yearlyKg).toBeGreaterThan(0);
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(100);

    // 3. Generate personalised recommendations
    const recs = generateRecommendations(inputs);
    expect(recs.length).toBeGreaterThan(0);
    
    // With 2000km transport, transport tip should exist
    const hasTransportTip = recs.some(r => r.category === "transport");
    expect(hasTransportTip).toBe(true);

    // 4. Save to history
    saveCalculation(inputs, result);

    // 5. Verify history
    const history = getHistory();
    expect(history).toHaveLength(1);
    expect(history[0].inputs.transport).toBe(2000);
    expect(history[0].result.yearlyKg).toBe(result.yearlyKg);
  });
});
